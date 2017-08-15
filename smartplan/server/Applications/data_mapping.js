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
				//Meteor.call("createValuesfromLda", app_id, att);
			}
		}
	},
	"create_all_VA_from_lda" : function(app_id, parent, child, assignments){
		_.forEach(assignments, function(ass){
			Meteor.call('create_VA_from_parent_child', app_id, parent, child, ass);
		})
	},
	"isolateAssignments" : function(dt, parent, child){
		var newContent = [];

		_.forEach(dt, function(l){
			newContent.push({parent : l[parent], child : l[child]});
		})

		console.log("output : ", newContent);
		return newContent;
	}
});