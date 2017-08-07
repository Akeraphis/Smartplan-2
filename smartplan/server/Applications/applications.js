Meteor.methods({
	'create_New_App' : function(name, desc){
		return Applications.insert({name : name, desc : desc, author : this.userId, createdAt : new Date(), attributes : []});
	},
	'create_attribute' : function(app_id, name, type, desc){
		var att_id = Attributes.insert({application : app_id, name : name, type : type, desc : desc, isSelected : false, values : []})
		Applications.update({_id : app_id}, {$push : {attributes : {_id : att_id}}});
		return att_id;
	},
	'deleteApplication' : function(app_id){
		Attributes.remove({application : app_id});
		Applications.remove({_id : app_id});
	},
	'delete_Att' : function(att_id){
		Attributes.remove({_id : att_id});
	},
	'create_value' : function(app_id, att_id, value){
		Attributes.update({_id : att_id},{$push : {values : {value : value, relations : []}}});
	},
	"delete_value": function(att_id, value){
		Attributes.update({_id : att_id}, {$pull : {values : {value : value}}});
	}
});

