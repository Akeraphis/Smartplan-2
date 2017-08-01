Template.DataTable_Edit.helpers({
	'getDt' : function(){
		var id = FlowRouter.getParam('id');
		return DataTables.findOne({_id : id});
	}
})