Template.Company_Update.helpers({
	getCompany : function(){
		var id= FlowRouter.getParam('id');
		return Companies.findOne({_id : id});
	},
});