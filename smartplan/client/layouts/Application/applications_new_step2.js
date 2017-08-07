Template.Applications_New_Step2.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var app_id = FlowRouter.getParam('id');
		self.subscribe("attributes_for_app", app_id);
	})
})


Template.Applications_New_Step2.helpers({
	'application' : function(){
		var app_id = FlowRouter.getParam('id');
		return Applications.findOne({_id : app_id});
	},
	'getAtt' : function(id){
		return Attributes.findOne({_id : id});
	},
	'hasAttId' : function(){
		var att_id = FlowRouter.getParam('attid');
		if(att_id != this._id){
			return false;
		}
		else{
			return true;
		}
	}
});

Template.Applications_New_Step2.events({
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

				FlowRouter.go('/applications/new_step_2/'+app_id+'/'+res)
			}
			else{
				console.log(err);
			}
		});
	},
	'click .panel-heading':function(e){
		FlowRouter.go('/applications/new_step_2/'+this.application+'/'+this._id)
	},
	'click #att-delete': function(e){
		Meteor.call("delete_Att", this._id);
	},
	'click #new-val': function(){
		var app_id = FlowRouter.getParam('id');
		var att_id = FlowRouter.getParam('attid');
		console.log("Creation of a new value for attibute : ", att_id)

		//Retrieve attribute characteristics
		var value = document.getElementById('value').value;

		//Create Attribute
		Meteor.call("create_value", app_id, att_id, value, function(err, res){
			if(!err){
				//Hide modal after attribute creation
				$('#myModal2').modal('hide');
				$('#myModal2').on('hidden.bs.modal', function (e) {
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
	'click .new_app_go_step3' : function(event){
		var id = FlowRouter.getParam('id')
		FlowRouter.go('/applications/new_step_3/'+id);
	},
});

Template.attribute_values.events({
	'click .fa-trash': function(){
		var att_id = FlowRouter.getParam("attid");
		Meteor.call("delete_value", att_id, this.value);
	}
})