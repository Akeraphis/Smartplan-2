Template.Attributes_tables.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
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
	'getVA' : function(){
		var id = FlowRouter.getParam('attid');
		return ValuesAssignments.findOne({attribute : id});
	},
	'settings' : function() {
		return  {
			showFilter: true,
			showNavigation:'auto',
			rowsPerPage: 50,
		};
	},
	'notEmpty': function(content){
		var res = false;
		if(content.length>0){
			res=true;
		}
		return res;
	},
	"getName" : function(){
		var att_id = FlowRouter.getParam('attid');
		return Attributes.findOne({_id : att_id}).name;
	},
	'getAtt' : function(){
		var att_id = FlowRouter.getParam('attid');
		return Attributes.findOne({_id : att_id});
	}
});

Template.Attributes_tables.events({
	//Double click in a cell to edit element
	'dblclick .reactive-table tbody tr': function (event) {

		var att_id = FlowRouter.getParam("attid");
		var att_name = Attributes.findOne({_id : att_id}).name;

		// Have a dropdown if and only if we are not double clicking on a value of the first column
		if(event.target.className != att_name){
			var text = event.target.innerHTML;
			var selectList = document.createElement("select");
			
			//Remove the _id out of the json object
			var myObj = this;
			delete myObj._id;

			//Set json in Session to catch after edit
			Session.set("editCell", myObj);
			event.target.innerHTML="";
			selectList.className = "dropdown-content";
			Session.set("column_name", event.target.className);

			//Add Option selected to the select
			Meteor.call('getValues', event.target.className, function(err, res){
				if(!err){
					event.target.appendChild(selectList, event.target);
					for (var i = 0; i < res.length; i++) {
						var option = document.createElement("option");
						option.value = res[i];
						option.text = res[i];
						selectList.appendChild(option);
					}
					selectList.focus();
				}
			});		
		}
		//If clicked on the first colulmn we would like to have a simple input text
		else{
			var text = event.target.innerHTML;
			
			//Input field
			var input = document.createElement("input");			
			input.className = "updateCell";
			input.type = "text";
			input.value = text;

			//Delete button
			var deleteButton = document.createElement("button");
			deleteButton.className = "delete-Att";
			deleteButton.innerHTML = "<i class='fa fa-trash'></i>";
			
			//Remove the _id out of the json object
			var myObj = this;
			delete myObj._id;

			//Set json in Session to catch after edit
			Session.set("editCell", myObj);
			Session.set("column_name", event.target.className);

			event.target.innerHTML="";
			event.target.appendChild(input, event.target);
			event.target.appendChild(deleteButton, event.target);
			input.focus();
		}		
	},
	// When Loosing Focus, save value to the collection
	'focusout .dropdown-content': function(event){
		var att_id = FlowRouter.getParam('attid');
		var temp = event.target.value;
		event.target.outerHTML=temp;

		if(Session.get("column_name")!= "dropdown-content"){
			//Call method to update collection
			Meteor.call("updateValuesAssignments", att_id, temp, Session.get("column_name"),  Session.get("editCell"));
		}
	},
	'focusout .updateCell': function(event){
		var att_id = FlowRouter.getParam('attid');
		var temp = event.target.value;
		//event.target.outerHTML=temp;

		if(Session.get("column_name")!= "dropdown-content"){
			//Call method to update collection
			Meteor.call("updateValuesAssignments", att_id, temp, Session.get("column_name"),  Session.get("editCell"));
		}
	},
	'keypress .dropdown-content': function(event){
		if (event.keyCode==13) {
			var att_id = FlowRouter.getParam('attid');
			var temp = event.target.value;
			event.target.outerHTML=temp;

			if(Session.get("column_name")!= "dropdown-content"){
				//Call method to update collection
				Meteor.call("updateValuesAssignments", att_id, temp, Session.get("column_name"),  Session.get("editCell"));
			}
		}
	},
	'keypress .updateCell': function(event){
		if (event.keyCode==13) {
			var att_id = FlowRouter.getParam('attid');
			var temp = event.target.value;
			//event.target.outerHTML=temp;

			if(Session.get("column_name")!= "dropdown-content"){
				//Call method to update collection
				Meteor.call("updateValuesAssignments", att_id, temp, Session.get("column_name"),  Session.get("editCell"));
			}
		}
	},
	'click .delete-Att': function(event){
		var att_id = FlowRouter.getParam('attid');
		var app_id = FlowRouter.getParam('id');
		Meteor.call("deleteValue", app_id, att_id, Session.get("editCell"))
	},
	'click #edit-attribute': function(e){
		var att_id = FlowRouter.getParam('attid');
		$('#myModal_'+att_id).modal('show');
		var att = Attributes.findOne({_id : att_id});

		document.getElementById('attribute-name-'+att_id).value = att.name;
		document.getElementById('attribute-type-'+att_id).value = att.type;
		document.getElementById('attribute-text-'+att_id).value = att.desc;
		document.getElementById('attribute-parent-'+att_id).value = att.parent;
		document.getElementById('attribute-parent-'+att_id).disabled = true;
		document.getElementById('attribute-name-'+att_id).disabled = true;
	},
	'click #delete-attribute': function(e){
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

Template.edit_att_modal.helpers({
	'getAtt': function(){
		var app_id = FlowRouter.getParam("id");
		return 	Attributes.find({application : app_id});
	}
});

Template.edit_att_modal.events({
	'click #edit-att': function(e){

		var att_id = FlowRouter.getParam('attid');
		//Retrieve attribute characteristics
		var name = document.getElementById('attribute-name-'+att_id).value;
		var type = document.getElementById('attribute-type-'+att_id).value;
		var desc = document.getElementById('attribute-text-'+att_id).value;
		var parent = document.getElementById('attribute-parent-'+att_id).value;

		//Create Attribute
		Meteor.call("edit_attribute", att_id, name, type, desc, parent);
		$('#myModal_'+att_id).modal('hide');
	},
});