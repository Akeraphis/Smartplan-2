Meteor.methods({
	deleteCompany: function(id){
		console.log("------- Deleting Company :", id, ' -------');
		Companies.remove({_id : id});
	},

	Add_User_Company: function(profile_id, company_id){
		var profile = Profiles.findOne({_id : profile_id});
		Companies.update({_id : company_id}, {$push: {employees: {_id: profile._id, userId: profile.user_id, name : profile.name, role : profile.role}} }, function(error, affectedDocs) {
			if (error) {
				throw new Meteor.Error(500, error.message);
			} else {
				return "Update Successful";
			} 
		});
	},

	Remove_User_Company: function(profile_id, company_id){
		var profile = Profiles.findOne({_id : profile_id});
		Companies.update({
				_id : company_id
			},
			{$pull:{ employees:{_id: profile_id}}},
			{multi : true}
		);
	}
})