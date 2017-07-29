Template.Assign_Users.helpers({
	getCompany : function(){
		var id= FlowRouter.getParam('id');
		return Companies.findOne({_id : id});
	},
	//Function to get all profiles not already assigned for this company
	getNAUsers : function(){
		var company_id= FlowRouter.getParam('id');
		var companyUs = Companies.findOne({_id : company_id}).employees;
		var temp = [];
		_.forEach(companyUs, function(comp){temp.push(comp._id)});
		return Profiles.find({ _id : {$nin: temp} });
	}
});

Template.Assign_Users.events({
	'click .add-user-company': function(e){
		var company_id= FlowRouter.getParam('id');
		Meteor.call("Add_User_Company", this._id, company_id);
	},
	'click .remove-user-company': function(e){
		var company_id= FlowRouter.getParam('id');
		Meteor.call("Remove_User_Company", this._id, company_id);
	}
})