Session.set("DL", []);

Template.accordeon_list.helpers({
	'getName' : function(att_id){
		var att= Attributes.findOne({_id : att_id});
		if (att){
			return att.name;
		}
	}
});

Template.Attributes_list.events({
	'focusout .panel-title': function(e){
		var id = FlowRouter.getParam('id');
		//FlowRouter.go("/applications/editor/"+id);
		$("#details-"+this._id).collapse('hide');
	},
});

Template.newAttribute.events({
	'click #new-att': function(){
		var app_id = FlowRouter.getParam('id');

		//Retrieve attribute characteristics
		var name = document.getElementById('attribute-name').value;
		var type = document.getElementById('attribute-type').value;
		var desc = document.getElementById('attribute-text').value;
		var parent = document.getElementById('attribute-parent').value;


		//Create Attribute
		Meteor.call("create_attribute", app_id, name, type, desc, parent, function(err, res){
			if(!err){
				//Hide modal after attribute creation
				$('#myModal').modal('hide');
				$('#myModal').on('hidden.bs.modal', function (e) {
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
	}
});

Template.new_att_modal.helpers({
	'getAtt': function(){
		var app_id = FlowRouter.getParam("id");
		return 	Attributes.find({application : app_id});
	}
});

Template.import_from_dl_modal.helpers({
	'getDL' : function(){
		return DataLayers.find({});
	},
	'getDT' : function(){
		var res = Session.get("DL")
		return res;
	}
});

Template.import_from_dl_modal.events({
	'change #select_dl': function(e){
		Session.set("DL", DataLayers.findOne({_id : e.target.value}).dataTables);
	},
	'click #import_att_from_dl': function(e){
		var app_id = FlowRouter.getParam("id");
		var res = [];
		var checks = document.getElementsByClassName('form-check-input');
		_.forEach(checks, function(check){
			if(check.checked){
				res.push(check.value);
			}
		});
		Meteor.call("create_att_from_dl", app_id, res);
	},
})