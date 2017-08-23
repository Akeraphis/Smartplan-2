// Session.set("isFactImported", true);

Template.accordeon_list_facts.helpers({
	'getName' : function(ts_id){
		var fact= Facts.findOne({_id : ts_id});
		if (fact){
			return fact.name;
		}
	},
	'getFacts': function(){
		var app_id = FlowRouter.getParam('id');
		return Facts.find({application : app_id});
	}
});

Template.Facts_list.events({
	'focusout .panel-title': function(e){
		var id = FlowRouter.getParam('id');
		//FlowRouter.go("/applications/editor/"+id);
		$("#details-"+this._id).collapse('hide');
	},
});

Template.newFact.events({
	'click #new-fact': function(){
		var app_id = FlowRouter.getParam('id');

		//Retrieve attribute characteristics
		var name = document.getElementById('fact-name').value;
		var type = document.getElementById('fact-type').value;
		var desc = document.getElementById('fact-text').value;


		//Create Attribute
		Meteor.call("create_fact", app_id, name, type, desc, function(err, res){
			if(!err){
				//Hide modal after attribute creation
				$('#myModal_facts').modal('hide');
				$('#myModal_facts').on('hidden.bs.modal', function (e) {
					$(this)
						.find("input,textarea")
						.val('')
						.end()
						.find("input[type=checkbox], input[type=radio]")
						.prop("checked", "")
						.end();
				});
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