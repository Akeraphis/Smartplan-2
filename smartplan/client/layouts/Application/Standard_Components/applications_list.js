Meteor.subscribe("applications");

Template.Applications_List.helpers({
	'getApp' : function(){
		return Applications.find({});
	},
});

Template.App_thumbnail.events({
	'click .btn-danger': function(e){
		console.log("Deleting Application ", this._id);
		Meteor.call("deleteApplication", this._id);
	},
	'click .btn-primary': function(){
		var id = this._id;
		FlowRouter.go('/applications/main/'+id);
	}
})