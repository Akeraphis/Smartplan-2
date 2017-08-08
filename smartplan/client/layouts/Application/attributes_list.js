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
		Meteor.call("delete_Att", id, this._id);
	},
	'click .edit-attribute': function(e){
		$('#myModal3').modal('show');
		var att = Attributes.findOne({_id : this._id});
		document.getElementById('attribute-name-3').value = att.name;
		document.getElementById('atribute-type-3').value = att.type;
		document.getElementById('atribute-text-3').value = att.desc;
	},
	'click #edit-att': function(e){

		//Retrieve attribute characteristics
		var name = document.getElementById('attribute-name-3').value;
		var type = document.getElementById('atribute-type-3').value;
		var desc = document.getElementById('atribute-text-3').value;

		//Create Attribute
		console.log(e, this)
		Meteor.call("edit_attribute", this._id, name, type, desc, function(err, res){
			if(!err){
				//Hide modal after attribute creation
				$('#myModal3').modal('hide');
				$('#myModal3').on('hidden.bs.modal', function (e) {
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
});

Template.newAttribute.events({
	'click #new-att': function(){
		var app_id = FlowRouter.getParam('id');

		//Retrieve attribute characteristics
		var name = document.getElementById('attribute-name').value;
		var type = document.getElementById('atribute-type').value;
		var desc = document.getElementById('atribute-text').value;

		//Create Attribute
		Meteor.call("create_attribute", app_id, name, type, desc, function(err, res){
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
			}
			else{
				console.log(err);
			}
		});
	},
});