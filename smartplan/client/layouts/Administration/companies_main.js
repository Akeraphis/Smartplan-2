Meteor.subscribe("companies");

Template.Companies_Main.helpers({
	'companies' : function(){
		return Companies.find({});
	}
})