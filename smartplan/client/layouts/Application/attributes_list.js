Session.set("DL", []);

Template.accordeon_list.helpers({
	'getName' : function(att_id){
		var att= Attributes.findOne({_id : att_id});
		if (att){
			return att.name;
		}
	},
	'hasParentNone' : function(att_id){
		var att=Attributes.findOne({_id : att_id});
		if(att){
			if (att.parent == "None"){
				return true
			}
			else{
				return false
			}
		}
	},
	'hasChildren': function(att_id){
		var res = false;
		var att = Attributes.findOne({_id : att_id});
		if(att){
			if(att.children.length>0){
				res = true
			}
		}
		return res
	},
});

Template.accordeon_list.events({
	'click .list-group-item': function(e){
		$('.list-group-item').on('click', function() {
			$('.glyphicon', this)
			.toggleClass('glyphicon-chevron-right')
			.toggleClass('glyphicon-chevron-down');
		});
	},
})

Template.recursive_panel.helpers({
	'getChildren' : function(att_id){
		var att = Attributes.findOne({_id : att_id});
		if(att){
			return att.children;
		}
	},
	'getName' : function(att_id){
		var att = Attributes.findOne({_id : att_id});
		if (att){
			return att.name;
		}
	},
	'hasChildren': function(att_id){
		var res = false;
		var att = Attributes.findOne({_id : att_id});
		if(att){
			if(att.children.length>0){
				res = true
			}
		}
		return res
	},
})

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
	},
	'click #refresh_values_from_dl': function(e){
		var app_id = FlowRouter.getParam("id");
		Meteor.call("refresh_values_from_dl", app_id, function(err, res){
			if(!err){
				console.log(res);
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