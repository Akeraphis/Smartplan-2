Meteor.methods({
	'create_New_App' : function(name, desc){
		return Applications.insert({name : name, desc : desc, author : this.userId, createdAt : new Date(), attributes : []});
	},
	'create_attribute' : function(app_id, name, type, desc, parent){
		var att_id = Attributes.insert({application : app_id, name : name, type : type, desc : desc, parent: parent, children : [], values : []})
		if(parent != 'None'){
			Attributes.update({_id : parent}, {$push : {children : att_id}});
		}
		Applications.update({_id : app_id}, {$push : {attributes : {_id : att_id}}});
		return att_id;
	},
	'edit_attribute' : function(att_id, name, type, desc, parent){
		var previous_parent = Attributes.findOne({_id : att_id}).parent;
		Attributes.update({_id : att_id}, {$set : {name : name, type : type, desc : desc}});
		if(parent != previous_parent){
			Attributes.update({_id : att_id}, {$set : {parent : parent}});
			Attributes.update({_id : previous_parent}, {$pull : {children : att_id}});
			if(parent != 'None'){
				Attributes.update({_id : parent}, {$push : {children : att_id}});
			}
		}
	},
	'deleteApplication' : function(app_id){
		Attributes.remove({application : app_id});
		Applications.remove({_id : app_id});
	},
	'delete_Att' : function(app_id, att_id){
		Applications.update({_id : app_id}, {$pull : {attributes : {_id : att_id}}});
		var att = Attributes.findOne({_id : att_id})
		Attributes.update({_id : att.parent}, {$pull : {children : att_id}});
		Attributes.update({parent : att_id}, {$set : {parent : "None"}});
		Attributes.remove({_id : att_id});
	},
	'create_value' : function(app_id, att_id, value){
		Attributes.update({_id : att_id},{$push : {values : {value : value, relations : []}}});
	},
	"delete_value": function(att_id, value){
		Attributes.update({_id : att_id}, {$pull : {values : {value : value}}});
	}
});

