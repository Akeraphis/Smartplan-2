Template.Profile_Update.helpers({
	getProfile : function(){
		var id= FlowRouter.getParam('id');
		return Profiles.findOne({_id : id});
	},
});

Template.Profile_Update.events({
	'click .updateProfile' : function(){
		var id = FlowRouter.getParam('id');
		var name = document.getElementById('name').value;
		var role = document.getElementById('role').value;
		var email = document.getElementById('email').value;
		Meteor.call("updateProfile", id, name, role, email);
		FlowRouter.go('/administration/profiles');
	}
})