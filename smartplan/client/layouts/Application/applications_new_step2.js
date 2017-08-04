Template.Applications_New_Step2.helpers({
	'application' : function(){
		var app_id = FlowRouter.getParam('id');
		return Applications.findOne({_id : app_id});
	}
});