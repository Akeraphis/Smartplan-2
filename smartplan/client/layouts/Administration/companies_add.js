Template.Companies_New.events({
	'click .newCompany': function(){
		var compName = document.getElementById("name").value;
		var compDesc = document.getElementById("desc").value;
		Meteor.call('createCompany', compName, compDesc);
		FlowRouter.go('/administration/companies');
	},
	'click .resetCompany': function(){
		document.getElementById("name").value = "";
		document.getElementById("desc").value = "";
	}
});