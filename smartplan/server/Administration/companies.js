Meteor.methods({
	deleteCompany: function(id){
		console.log("------- Deleting Company :", id, ' -------');
		Companies.remove({_id : id});
	},

	createCompany: function(name, desc){
		var cAt = new Date();
		var newComp = Companies.insert({name: name, desc: desc, createdAt: cAt, author : this.userId, employees : [] })
		var newDataLayer = DataLayers.insert({name : "Data Layer "+name, company_id: newComp, createdAt: cAt, author: this.userId});
	},

	updateCompany: function(id, name, desc){
		var newComp = Companies.update({_id : id}, {name: name, desc: desc});
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
	},
	getCompanyIds : function(){
		var comp = Companies.findOne({ employees : {$elemMatch : {userId : "BTh98d4T3saTZDZj4" }}});
		/*var compIds=[];
		_.forEach(comp, function(c){
			compIds.push(c._id);
		})
		console.log(compIds);*/
		return comp;
	}
})