Template.Attributes_list.helpers({
	'getName' : function(att_id){
		var att= Attributes.findOne({_id : att_id});
		if (att){
			return att.name;
		}
	}
});

Template.Attributes_list.events({
	'click .list-group-item': function(e){
		var id = FlowRouter.getParam('id');
		FlowRouter.go("/applications/editor/"+id+'/'+this._id);
	},
	'click .delete-attribute': function(e){
		var id = FlowRouter.getParam('id');
		var att_id = FlowRouter.getParam('attid');
		Meteor.call("delete_Att", id, att_id, function(err, res){
			if(!err){
				FlowRouter.go('/applications/editor/'+id);
			}
			else{
				console.log('Error in deleting attribute : '+err);
			}
		});
	},
	'click .edit-attribute': function(e){
		$('#myModal_'+this._id).modal('show');
		var att = Attributes.findOne({_id : this._id});

		document.getElementById('attribute-name-'+this._id).value = att.name;
		document.getElementById('attribute-type-'+this._id).value = att.type;
		document.getElementById('attribute-text-'+this._id).value = att.desc;
		document.getElementById('attribute-parent-'+this._id).value = att.parent;
		document.getElementById('attribute-parent-'+this._id).disabled = true;
	},
	'click #edit-att': function(e){

		//Retrieve attribute characteristics
		var name = document.getElementById('attribute-name-'+this._id).value;
		var type = document.getElementById('attribute-type-'+this._id).value;
		var desc = document.getElementById('attribute-text-'+this._id).value;
		var parent = document.getElementById('attribute-parent-'+this._id).value;

		//Create Attribute
		Meteor.call("edit_attribute", this._id, name, type, desc, parent);
		$('#myModal_'+this._id).modal('hide');
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
	},
});

Template.new_att_modal.helpers({
	'getAtt': function(){
		var app_id = FlowRouter.getParam("id");
		return 	Attributes.find({application : app_id});
	}
});

Template.edit_att_modal.helpers({
	'getAtt': function(){
		var app_id = FlowRouter.getParam("id");
		return 	Attributes.find({application : app_id});
	}
})