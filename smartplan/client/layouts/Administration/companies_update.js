Template.Company_Update.helpers({
	getCompany : function(){
		var id= FlowRouter.getParam('id');
		return Companies.findOne({_id : id});
	},
});

Template.Company_Update.events({
	'click .updateCompany': function(){
		var compId = FlowRouter.getParam("id");
		var compName = document.getElementById("name").value;
		var compDesc = document.getElementById("desc").value;
		Meteor.call('updateCompany', compId, compName, compDesc);
		FlowRouter.go('/administration/companies');
	}
})