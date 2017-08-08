Template.Attributes_tables.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe("values_for_app", id);
		self.subscribe("values_assignments_for_app", id);
	})
});

Template.Attributes_tables.helpers({
	'hasAtt' : function(){
		var res = false;
		var attid = FlowRouter.getParam("attid");
		if(attid){
			res = true;
		}
		return res;
	},
	'getAtt': function(){
		var attid = FlowRouter.getParam('attid');
		return Attributes.findOne({_id : attid});
	},
	'getName' : function(att_id){
		var att= Attributes.findOne({_id : att_id});
		if (att){
			return att.name;
		}
	},
	'parentChildren': function(val, parentContext){
		return Template.parentData(1).children;
	},
	'getAttById': function(id){
		return Attributes.findOne({_id : id});
	},
	'getValueAssigned': function(id){
		res = "";
		/*_.forEach(Template.parentData(1), function(rel){
			if(rel._id==id){
				res = rel.value;
				ValuesAssignments.findOne({})
			}
		});*/
		return res;
	},
	'getValues' : function(att_id){
		return Values.find({attribute : att_id});
	},
});

Template.Attributes_tables.events({
	'click .fa-trash': function(){
		var att_id = FlowRouter.getParam("attid");
		Meteor.call("delete_value", att_id, this.value);
	},
	'change .dropdown-content': function(e){
		console.log('change : ', this, e.target.value, Template.parentData(1));
	}
})

Template.newValue.events({
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
});
