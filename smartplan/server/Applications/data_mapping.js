Meteor.methods({
	//---------------------------------------------------
	// Methods on Links DL Attributes
	//---------------------------------------------------
	"create_links_dt_attributes" : function(app_id, dt, col, isNewAtt, oldAtt){
		var attId = "";
		//if NewAtt is true, create the attribute and retrieve Id
		if(isNewAtt){
			attId = Meteor.call("create_attribute", app_id, col, "String", "imported from data layer", "None");
		}
		//else we just take the oldAtt id
		else{
			attId = oldAtt;
		}
		var lda = LinksDLAttributes.insert({application : app_id, attribute : attId, datatable : {_id : dt, column : col}});
	},
	"refresh_values_from_dl" : function(app_id){

		var attributes = Attributes.find({application : app_id}).fetch();

		//Loop on all Attributes of App
		_.forEach(attributes, function(att){

			Meteor.call("createValuesfromLda", app_id, att);
			//If the attribute has no parent
			
		});

		//find and sort lda
		// var lda = LinksDLAttributes.find({application : app_id}, {sort : {"datatable._id": 1}}).fetch();
		
		// //Loop on lda and create all values
		// _.forEach(lda, function(ld){
		// 	Meteor.call("createValuesfromLda", app_id, ld);
		// });
	},
	"findLinksFromAtt" : function(att_id){
		return LinksDLAttributes.find({attribute : att_id}).fetch();
	},
	"retrieveContentTableFromLink" : function(link){
		return DataTables.findOne({_id : link.datatable._id}).content;
	},
	"create_unique_values": function(app_id, contents, att, link){
		var linkAttName = link.datatable.column;
		var attName = att.name;
		var att_id = att._id;
		var res = [];

		_.forEach(contents, function(content){
			var obj = {};
			obj[attName] = content[linkAttName];
			if (_.findWhere(res, obj) == null) {
				res.push(obj);
			}
		});

		ValuesAssignments.update({attribute : att_id}, {$set : {content : res}});
	},
	"createValuesfromLda" : function(app_id, att){
		if(att){
			if(att.parent == "None"){
				//For each link, create the unique values
				Meteor.call("findLinksFromAtt", att._id, function(err, links){
					if(!err){
						_.forEach(links, function(link){
							var contents = Meteor.call('retrieveContentTableFromLink', link);
							Meteor.call("create_unique_values", app_id, contents, att, link);
						});
					}
				});
				//If there are children
				if(att.children.length>0){
					//Call the same method on all children
					_.forEach(att.children, function(c){
						Meteor.call("createValuesfromLda", app_id, Attributes.findOne({_id : c}));
					});
				}
			}
			//else if there is a parent
			else{
				console.log("there is a parent for ", att.name);
				//find the links for the specified attributes
				Meteor.call("findLinksFromAtt", att._id, function(err, links){
					if(!err){
						//For each link, create the unique values for the specific attribute
						_.forEach(links, function(link){
							var contents = Meteor.call('retrieveContentTableFromLink', link);
							Meteor.call("create_unique_values", app_id, contents, att, link);
						});
					}
					
					//We now need to determine if there is a common link for the parent in the same table and identify this table
					var dTID, plink, clink = "";
					Meteor.call("findLinksFromAtt", att.parent, function(err, parentLinks){
						if(!err){
							_.forEach(links, function(l){
								_.forEach(parentLinks, function(pl){
									if(l.datatable._id==pl.datatable._id){
										plink = pl
										clink = l
										dTID = l.datatable._id;
									}
								});
							});
							console.log("the common table is : ", dTID);

							//In this table, we need to create the assignments in the parent document
							var dt = DataTables.findOne({_id : dTID}).content;
							Meteor.call("create_all_VA_from_lda", app_id, dt, plink, clink, att);
						}
					});
				});
			}	
		}
	},
	"create_all_VA_from_lda" : function(app_id, dt, plink, clink, att){
		
		var attName = att.name;
		var linkName = clink.datatable.column;
		var parentName = Attributes.findOne({_id : att.parent}).name;
		var linkParentName = plink.datatable.column;
		console.log(attName, linkName, parentName, linkParentName);

		//Find Value assignment of the parent
		var parVA = ValuesAssignments.findOne({attribute : att.parent}).content;
		var newContent = [];
		_.forEach(parVA, function(c){
			_.forEach(dt, function(dc){
				var newObj = c;
				if(c[parentName]==dc[linkParentName]){
					newObj[attName]=dc[linkName];
					newContent.push(newObj);
				}
			});
		});

		console.log('result : ', newContent);
		ValuesAssignments.update({attribute : att.parent},{$set : {content : newContent}});
	},
});