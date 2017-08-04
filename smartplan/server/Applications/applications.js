Meteor.methods({
	'create_New_App' : function(name){
		return Applications.insert({name : name, author : this.userId, createdAt : new Date(), attributes : []});
	},
	'create_attribute' : function(app_id, name, type, desc){
		var att_id = Attributes.insert({application : app_id, name : name, type : type, desc : desc, values : []})
		Applications.update({_id : app_id}, {$push : {attributes : {_id : att_id, isSelected : false}}});
	},
	'getAttribute' : function(att_id){
		var att = Attributes.findOne({_id : att_id});
		return att.values;
	},
});