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
	'getTS' : function(){
		var id = FlowRouter.getParam('factid');
		return Timeseries.findOne({fact : id});
	},
	'settings' : function() {
		return  {
			showFilter: true,
			showNavigation:'auto',
			rowsPerPage: 50,
		};
	},
	'notEmpty': function(content){
		var res = false;
		if(content.length>0){
			res=true;
		}
		return res;
	},
	"getName" : function(){
		var fact_id = FlowRouter.getParam('factid');
		return Facts.findOne({_id : fact_id}).name;
	},
	'getFact' : function(){
		var fact_id = FlowRouter.getParam('factid');
		return Facts.findOne({_id : fact_id});
	}
});
