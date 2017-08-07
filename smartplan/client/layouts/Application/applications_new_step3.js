Template.Applications_New_Step3.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var app_id = FlowRouter.getParam('id');
		self.subscribe("attributes_for_app", app_id);
	})
});

Template.Applications_New_Step3.helpers({
	'getApp' : function(){
		var id= FlowRouter.getParam('id');
		return Applications.findOne({_id : id});
	}
});