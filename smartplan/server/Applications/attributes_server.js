Meteor.methods({
	//---------------------------------------------------
	// Methods on Attributes
	//---------------------------------------------------

	//create attribute for type string
	'create_attribute' : function(app_id, name, type, desc, parent){
		var att_id = Attributes.insert({application : app_id, name : name, type : type, desc : desc, imported : "false", parent: parent, children : []})
		if(parent != 'None'){
			Attributes.update({_id : parent}, {$push : {children : {_id : att_id}}});
			Meteor.call("createEmptyValuesAssignments", parent, att_id);
		}
		Applications.update({_id : app_id}, {$push : {attributes : {_id : att_id}}});
		ValuesAssignments.insert({application : app_id, attribute : att_id, content : []});
		return att_id;
	},
	//create attribute for type period
	'create_period_attribute' : function(app_id, name, type, desc, start, end, bucket){
		var att_id = Attributes.insert({application : app_id, name : name, type : type, desc : desc, imported : "false", parent: "None", children : [], start_date : start, end_date : end, bucket : bucket});
		Applications.update({_id : app_id}, {$push : {attributes : {_id : att_id}}});
		Meteor.call("create_va_for_periods", app_id, att_id, start, end, bucket);
		return att_id;
	},
	'edit_attribute' : function(att_id, name, type, desc, parent){
		var previous_parent = Attributes.findOne({_id : att_id}).parent;
		Attributes.update({_id : att_id}, {$set : {name : name, type : type, desc : desc}});
	},
	'delete_Att' : function(app_id, att_id){
		
		//Delete VA
		ValuesAssignments.remove({attribute : att_id});
		
		//Remove attribute reference in the application
		Applications.update({_id : app_id}, {$pull : {attributes : {_id : att_id}}});
		
		//Remove references in VA
		Meteor.call("getAtt", att_id, function(err, res){
			if(!err){
				if(res.parent != "None"){
					var content = ValuesAssignments.findOne({attribute : res.parent}).content;
					var res2 = [];
					var att_name = res.name;
					_.forEach(content, function(c){
						delete c[att_name];
						res2.push(c);
					});
					ValuesAssignments.update({attribute : res.parent}, {$set : {content : res2}});
				}
			}
		});

		//Remove reference of child in other attributes
		Attributes.update({application : app_id}, {$pull : {children : { _id : att_id}}});

		//Remove reference of parents
		Attributes.update({parent : att_id}, {$set : {parent : "None"}});

		//Remove LDA
		LinksDLAttributes.remove({attribute : att_id});

		//Remove attribute
		Attributes.remove({_id : att_id});
	},
	'create_new_attribute_from_tables' : function(app_id, col_names){
		_.forEach(col_names, function(col){
			Meteor.call("create_attribute", app_id, col, "String", "Imported from Data Layer", "None");
		});
	},
	"retrieveAttributesFromId": function(att_id){
		Attributes.findOne({_id : att_id});
	},
})