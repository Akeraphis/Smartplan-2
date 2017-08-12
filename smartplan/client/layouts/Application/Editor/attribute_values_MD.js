Template.Attribute_values_MD.helpers({

});

Template.Attribute_values_MD.events({
	'click .btn-primary-outline': function(e){
		console.log("test", this);
		var id = FlowRouter.getParam('id');
		FlowRouter.go("/applications/editor/"+id+'/'+this._id);
	},
});