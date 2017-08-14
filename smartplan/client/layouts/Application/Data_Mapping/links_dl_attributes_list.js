Session.set('DLSelected', "");
Session.set('DTSelected', []);
Session.set('checkedNewAtt', true);

Template.modalDLAtt.helpers({
	'getDL': function(){
		return DataLayers.find({});
	},
	'getDT': function(){
		if(Session.get("DLSelected")!=""){
			return DataLayers.findOne({_id : Session.get('DLSelected')}).dataTables;
		}
	},
	'getCols': function(){
		if(Session.get("DTSelected")){
			return Session.get("DTSelected");
		}
	},
	'getAtt': function(){
		return Attributes.find({application: FlowRouter.getParam('id')});
	},
	'notCheckedNewAtt': function(){
		return !Session.get("checkedNewAtt");
	}
});

Template.modalDLAtt.events({
	'change #DL_selected': function(e){
		Session.set('DLSelected', document.getElementById("DL_selected").value);
	},
	'change #DT_selected': function(e){
		var dt = DataTables.findOne({_id : document.getElementById("DT_selected").value})
		if(dt){
			Session.set('DTSelected', Object.keys(dt.content[0]));
		}
	},
	'change #check_new': function(e){
		if(document.getElementById("check_new").checked){
			Session.set("checkedNewAtt", true);
		}
		else{
			Session.set("checkedNewAtt", false);	
		}
	},
	'click #new-att-dl-link': function(e){
		var app_id = FlowRouter.getParam('id');
		var dt = document.getElementById("DT_selected").value;
		var col = document.getElementById("col_selected").value;
		var newAtt = document.getElementById("check_new").checked;
		var oldAttId = "";
		var oldAtt = document.getElementById("attribute_linked");
		if(oldAtt){
			oldAttId = oldAtt.value;
		}
		console.log(dt, newAtt, oldAttId, col);
		Meteor.call("create_links_dt_attributes", app_id, dt, col, newAtt, oldAttId, function(err, res){
			if(!err){
				//Hide modal after attribute creation
				$('#myModalDLAtt').modal('hide');
				$('#myModalDLAtt').on('hidden.bs.modal', function (e) {
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
	}
});

Template.list_links_att_dl.helpers({
	'getLinks' : function(){
		return LinksDLAttributes.find({});
	},
	'getAttName': function(id){
		return Attributes.findOne({_id : id}).name;
	},
	'getTableName': function(id){
		return DataTables.findOne({_id : id}).name;
	},
});

Template.list_links_att_dl.events({
	'click .delete_link': function(){
		LinksDLAttributes.remove({_id : this._id});
	}
});