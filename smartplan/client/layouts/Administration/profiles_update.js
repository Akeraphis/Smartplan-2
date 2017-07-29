Template.Profile_Update.events({
	'click .toggle-menu': function(){
		var id= FlowRouter.getParam('id');
		console.log("test");
		//Meteor.call('updateProfile', id, "My super company");
	}
});

Template.Profile_Update.helpers({
	profile : function(){
		var id= FlowRouter.getParam('id');
		return Profiles.findOne({_id : id});
	}
})