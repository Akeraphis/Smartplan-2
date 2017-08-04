Template.Applications_New_Step2.helpers({
	'application' : function(){
		var app_id = FlowRouter.getParam('id');
		return Applications.findOne({_id : app_id});
	}
});

Template.Applications_New_Step2.events({
	'click .new-att': function(){
		console.log('New attribute');
		var app_id = FlowRouter.getParam('id');
		var name="test";
		Meteor.call("create_attribute", app_id, name);
	}
})