Meteor.methods({
	deleteProfile_User: function(id){
		console.log("------- Deleting Profile & User :", id, ' -------');
		Companies.update({}, {$pull : {employees : {_id : id}}});
		Companies.update({},
			{$pull:{ employees:{_id: id}}},
			{multi : true}
		);
		Meteor.users.remove({_id: id});
		Profiles.remove({_id : id});
	},
	updateProfile: function(id, name, role, email){
		console.log("------- Updating Profile :", id, ' -------');
		Profiles.update({_id : id}, {$set : {name : name, role : role, email : email}});
	}
});

Accounts.onCreateUser((options, user) => {
	Profiles.insert({user_id : user._id, email : user.emails[0].address, companies : []});
	return user;
});

