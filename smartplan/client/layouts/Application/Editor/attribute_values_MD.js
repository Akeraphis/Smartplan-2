Template.Attribute_values_MD.helpers({

});

Template.Attribute_values_MD.events({
	'click .panel-title': function(e){
		var id = FlowRouter.getParam('id');
		FlowRouter.go("/applications/editor/"+id+'/'+this._id);
	},
});