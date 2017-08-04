Session.set('app', {});
Meteor.subscribe("attributes");

Template.Applications_New_Step2.helpers({
	'application' : function(){
		var app_id = FlowRouter.getParam('id');
		return Applications.findOne({_id : app_id});
	},
	'getAtt' : function(id){
		return Attributes.findOne({_id : id});
	}
});

Template.Applications_New_Step2.events({
	'click #new-att': function(){
		var app_id = FlowRouter.getParam('id');

		//Retrieve attribute characteristics
		var name=document.getElementById('attribute-name').value;
		var type = document.getElementById('atribute-type').value;
		var desc = document.getElementById('atribute-text').value;

		//Create Attribute
		Meteor.call("create_attribute", app_id, name, type, desc);

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
	},
	'click .list-group-item':function(e){
		Meteor.call("getAttribute", this._id, function(err, res){
			if(!err){
				return res
			}
		});
	}
});