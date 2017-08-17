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
	},
});

Template.Applications_DataMapping.events({
	'dragstart .list-group-item': function(e){
		var column = ""
		_.forEach(this, function(letter){
			column = column+letter;
		});
		Session.set("att_dragged", {dt_id : e.target.parentNode.id, column : column});
	},
	'dropped .list-group': function(e, temp){
		e.preventDefault();
		console.log("dropped", this, e.target, Session.get("att_dragged"));
	},
});