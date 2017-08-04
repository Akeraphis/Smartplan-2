Meteor.subscribe("applications");

Template.Applications_List.helpers({
	'getApp' : function(){
		return Applications.find({});
	},
});