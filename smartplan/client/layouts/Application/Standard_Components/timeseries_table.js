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
		var factid = FlowRouter.getParam("factid");
		var res = [
			{'key': 'PlanningItem', label: 'Product'},
			{'key': 'Customer', label: 'Customer'},
			{'key': 'Region', label: 'Region'},
		];

		var i=0;
		var ts = Timeseries.findOne({fact : factid});

		//Retrieve all object keys and sort
		var ks = [];
		_.forEach(ts.values, function(v){
			ks.push(Object.keys(v)[0]);
		});
		ks.sort();

		_.forEach(ks, function(k){
			res.push({'key' : "values."+i+"."+k , 'label' : k});
			i++;
		});
		
		return{
			showFilter: true,
			showNavigation:'auto',
			rowsPerPage: 50,
			fields : res,
		};
	},
	'getName' : function(){
		var factid = FlowRouter.getParam("factid");
		var f = Facts.findOne({_id : factid});
		if (f){
			return f.name;
		}
	},
	'myTimeseries' : function(){
		var factid = FlowRouter.getParam("factid");
		return Timeseries.find({fact : factid});
	}
});
