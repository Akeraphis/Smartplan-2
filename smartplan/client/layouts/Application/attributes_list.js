Template.Attributes_list.helpers({
	'getName' : function(att_id){
		return Attributes.findOne({_id : att_id}).name;
	}
});

Template.Attributes_list.events({
	'click .list-group-item': function(e){
		var id = FlowRouter.getParam('id');
		FlowRouter.go("/applications/editor/"+id+'/'+this._id);
	}
})