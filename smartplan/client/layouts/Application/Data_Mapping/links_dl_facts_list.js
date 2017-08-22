Session.set('DLSelected_F', "");
Session.set('DTSelected_F', []);
Session.set('checkedNewFact', true);

Template.modalDLFact.helpers({
	'getDL': function(){
		return DataLayers.find({});
	},
	'getDT': function(){
		if(Session.get("DLSelected_F")!=""){
			return DataLayers.findOne({_id : Session.get('DLSelected_F')}).dataTables;
		}
	},
	'getCols': function(){
		if(Session.get("DTSelected_F")){
			return Session.get("DTSelected_F");
		}
	},
	'getFact': function(){
		return Facts.find({application: FlowRouter.getParam('id')});
	},
	'notCheckedNewFact': function(){
		return !Session.get("checkedNewFact");
	}
});

Template.modalDLFact.events({
	'change #DL_selected_f': function(e){
		Session.set('DLSelected_F', document.getElementById("DL_selected_f").value);
	},
	'change #DT_selected_f': function(e){
		var dt = DataTables.findOne({_id : document.getElementById("DT_selected_f").value})
		if(dt){
			Session.set('DTSelected_F', Object.keys(dt.content[0]));
		}
	},
	'change #check_new_f': function(e){
		if(document.getElementById("check_new_f").checked){
			Session.set("checkedNewFact", true);
		}
		else{
			Session.set("checkedNewFact", false);	
		}
	},
	'click #new-fact-dl-link': function(e){
		var app_id = FlowRouter.getParam('id');
		var dt = document.getElementById("DT_selected_f").value;
		var col = document.getElementById("col_selected_f").value;
		var newFact = document.getElementById("check_new_f").checked;
		var oldFactId = "";
		var oldFact = document.getElementById("fact_linked");
		if(oldFact){
			oldFactId = oldFact.value;
		}
		Meteor.call("create_links_dt_facts", app_id, dt, col, newFact, oldFactId, function(err, res){
			if(!err){
				//Hide modal after attribute creation
				$('#myModalDLFact').modal('hide');
				$('#myModalDLFact').on('hidden.bs.modal', function (e) {
					$(this)
						.find("input,textarea,select")
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
	}
});

Template.list_links_fact_dl.helpers({
	'getLinks' : function(){
		return LinksDLFacts.find({});
	},
	'getFactName': function(id){
		return Facts.findOne({_id : id}).name;
	},
	'getTableName': function(id){
		return DataTables.findOne({_id : id}).name;
	},
});

Template.list_links_fact_dl.events({
	'click .delete_link': function(){
		LinksDLFacts.remove({_id : this._id});
	}
});