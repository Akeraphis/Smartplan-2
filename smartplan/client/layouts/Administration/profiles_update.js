Template.Profile_Update.helpers({
	getProfile : function(){
		var id= FlowRouter.getParam('id');
		return Profiles.findOne({_id : id});
	},
});