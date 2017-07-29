Meteor.methods({
	deleteProfile_User: function(id){
		console.log("------- Deleting Profile & User :", id, ' -------');
		Meteor.users.remove({_id: id});
		Profiles.remove({_id : id});
	}
})


Accounts.onCreateUser((options, user) => {
	Profiles.insert({user_id : user._id});
	return user;
});