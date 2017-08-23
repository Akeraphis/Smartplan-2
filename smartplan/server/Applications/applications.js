Meteor.methods({
	//---------------------------------------------------
	// Methods on Applications
	//---------------------------------------------------
	'create_New_App' : function(name, desc){
		return Applications.insert({name : name, desc : desc, author : this.userId, createdAt : new Date(), attributes : []});
	},
	'deleteApplication' : function(app_id){
		ValuesAssignments.remove({application : app_id});
		Attributes.remove({application : app_id});
		Applications.remove({_id : app_id});
	},
});