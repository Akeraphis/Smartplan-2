Meteor.methods({
	'create_New_App' : function(name){
		return Applications.insert({name : name, author : this.userId, createdAt : new Date()});
	}
})