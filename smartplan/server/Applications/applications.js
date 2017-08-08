Meteor.methods({
	'create_New_App' : function(name, desc){
		return Applications.insert({name : name, desc : desc, author : this.userId, createdAt : new Date(), attributes : []});
	},
	'create_attribute' : function(app_id, name, type, desc, parent){
		var att_id = Attributes.insert({application : app_id, name : name, type : type, desc : desc, parent: parent, values : []})
		Applications.update({_id : app_id}, {$push : {attributes : {_id : att_id}}});
		return att_id;
	},
	'edit_attribute' : function(att_id, name, type, desc, parent){
		console.log("updating attribute :", att_id, name, type, desc, parent);
		Attributes.update({_id : att_id}, {$set : {name : name, type : type, desc : desc, parent : parent}});
	},
	'deleteApplication' : function(app_id){
		Attributes.remove({application : app_id});
		Applications.remove({_id : app_id});
	},
	'delete_Att' : function(app_id, att_id){
		Applications.update({_id : app_id}, {$pull : {attributes : {_id : att_id}}});
		Attributes.remove({_id : att_id});
	},
	'create_value' : function(app_id, att_id, value){
		Attributes.update({_id : att_id},{$push : {values : {value : value, relations : []}}});
	},
	"delete_value": function(att_id, value){
		Attributes.update({_id : att_id}, {$pull : {values : {value : value}}});
	}
});

