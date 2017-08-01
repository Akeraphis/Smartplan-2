Meteor.subscribe("dataLayers");
Meteor.subscribe("dataTables");

Template.DataLayer_Main.helpers({
	'dataLayer': function(){
		//var companyIds = Meteor.call("getCompanyIds");
		//console.log(companyIds);
		return DataLayers.find({});
	}
})