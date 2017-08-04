Meteor.methods({
	'create_New_App' : function(name){
		return Applications.insert({name : name, author : this.userId, createdAt : new Date(), attributes : []});
	},
	'create_attribute' : function(app_id, name){
		Applications.update({_id : app_id}, {$push : {attributes : {name : name}}});
	}
})