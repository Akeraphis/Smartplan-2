Session.set("DL", []);

Template.accordeon_list_ts.helpers({
	'getName' : function(ts_id){
		var ts= Timeseries.findOne({_id : ts_id});
		if (ts){
			return ts.name;
		}
	},
});

Template.Timeseries_list.events({
	'focusout .panel-title': function(e){
		var id = FlowRouter.getParam('id');
		//FlowRouter.go("/applications/editor/"+id);
		$("#details-"+this._id).collapse('hide');
	},
});

Template.newTimeSeries.events({
	'click #new-ts': function(){
		var app_id = FlowRouter.getParam('id');

		//Retrieve attribute characteristics
		var name = document.getElementById('timeseries-name').value;
		var type = document.getElementById('timeseries-type').value;
		var desc = document.getElementById('timeseries-text').value;


		//Create Attribute
		Meteor.call("create_timeseries", app_id, name, type, desc, function(err, res){
			if(!err){
				//Hide modal after attribute creation
				$('#myModal_ts').modal('hide');
				$('#myModal_ts').on('hidden.bs.modal', function (e) {
					$(this)
						.find("input,textarea")
						.val('')
						.end()
						.find("input[type=checkbox], input[type=radio]")
						.prop("checked", "")
						.end();
				});
				//Caused modal not to be closed
				//FlowRouter.go("/applications/editor/"+app_id+'/'+res);
			}
			else{
				console.log(err);
			}
		});
	},
	'click #refresh_timeseries_from_dl': function(e){
		var app_id = FlowRouter.getParam("id");
		Meteor.call("refresh_timeseries_from_dl", app_id, function(err, res){
			if(!err){
				console.log(res);
			}
			else{
				console.log(err);
			}
		});
	},
});