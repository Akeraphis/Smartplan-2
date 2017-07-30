Meteor.subscribe("dataLayers");

Template.DataLayer_Main.helpers({
	'dataLayer': function(){
		return DataLayers.find({});
	}
})