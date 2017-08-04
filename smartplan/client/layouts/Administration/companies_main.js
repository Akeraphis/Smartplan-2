Meteor.subscribe("companies");

Template.Companies_Main.helpers({
	'companies' : function(){
		return Companies.find({});
	}
});

Template.Companies_Main.events({
	'click .delete-company': function(){
		Meteor.call('deleteCompany', this._id);
	},
	'click .update-company': function(){
		FlowRouter.go("/administration/companies/update/"+this._id);
	},
	'click .assign-user-company': function(){
		FlowRouter.go("/administration/companies/assign-users/"+this._id)
	},
});