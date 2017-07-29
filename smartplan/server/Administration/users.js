Meteor.methods({
	updateProfile: function(id, company) {
		Profiles.update({_id : id}, {$set : {company : company}});
	},
	deleteProfile_User: function(id){
		console.log("------- Deleting Profile & User :", id, ' -------');
		Meteor.users.remove({_id: id});
		Profiles.remove({_id : id});
	}
})


Accounts.onCreateUser((options, user) => {
	Profiles.insert({user : user});
	return user;
});