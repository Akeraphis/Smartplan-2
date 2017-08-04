Meteor.subscribe("profiles");

Template.Profiles_Main.helpers({
	'profiles' : function(){
		return Profiles.find({});
	}
});

Template.Profiles_Main.events({
	'click .delete-user': function(){
		Meteor.call('deleteProfile_User', this._id);
	},
	'click .update-user': function(){
		FlowRouter.go("/administration/profiles/update/"+this._id);
	}
})