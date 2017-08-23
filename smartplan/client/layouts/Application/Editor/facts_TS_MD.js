Template.Facts_TS_MD.events({
	'click .btn-primary-outline': function(e){
		var id = FlowRouter.getParam('id');
		var att_id = FlowRouter.getParam('attid');
		FlowRouter.go("/applications/editor/"+id+'/'+att_id+'/'+this._id);
	},
});