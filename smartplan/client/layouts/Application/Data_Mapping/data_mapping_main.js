Template.Applications_DataMapping.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var app_id = FlowRouter.getParam('id');
		self.subscribe("attributes_for_app", app_id);
		self.subscribe("links_dl_attributes_for_app", app_id);
	})
});

Template.Applications_DataMapping.helpers({
	'getApp' : function(){
		return Applications.findOne({_id : FlowRouter.getParam('id')});
	}
});