Meteor.subscribe("Companies");

Template.Companies_Main.helpers({
	'companies' : function(){
		return Companies.find({});
	}
})