Template.Timeseries_tables.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe("timeseries_for_app", id);
	})
});

Template.Timeseries_tables.helpers({
	'hasFact' : function(){
		var res = false;
		var factid = FlowRouter.getParam("factid");
		if(factid){
			res = true;
		}
		return res;
	},
	'settings' : function() {
		return  {
			showFilter: true,
			showNavigation:'auto',
			rowsPerPage: 50,
		};
	},
	'getName' : function(){
		var factid = FlowRouter.getParam("factid");
		return Facts.findOne({_id : factid}).name;
	},
});
