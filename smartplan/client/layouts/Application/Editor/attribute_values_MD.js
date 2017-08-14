Template.Attribute_values_MD.events({
	'click .btn-primary-outline': function(e){
		var id = FlowRouter.getParam('id');
		FlowRouter.go("/applications/editor/"+id+'/'+this._id);
	},
});