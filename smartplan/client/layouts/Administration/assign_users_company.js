Template.Assign_Users.helpers({
	getCompany : function(){
		var id= FlowRouter.getParam('id');
		return Companies.findOne({_id : id});
	},
	getNAUsers : function(){
		return Profiles.find({})
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