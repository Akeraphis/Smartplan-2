Template.DataTable_Edit.helpers({
	'getDt' : function(){
		var id = FlowRouter.getParam('id');
		return DataTables.findOne({_id : id});
	},
	'settings' : function() {
		return  {
			showFilter: true,
			showNavigation:'auto',
			rowsPerPage: 50,
		};
	},
});

Template.DataTable_Edit.events({
	//Double click in a cell to edit element
	'dblclick .reactive-table tbody tr': function (event) {

		var text = event.target.innerHTML;
		var input = document.createElement("input");
		
		//Remove the _id out of the json object
		var myObj = this;
		delete myObj._id;

		//Set json in Session to catch after edit
		Session.set("editCell", myObj);
		input.className = "updateCell";
		input.type = "text";
		input.value = text;
		event.target.innerHTML="";
		event.target.appendChild(input, event.target);
		input.focus();
	},
	// When Loosing Focus, save value to the collection
	'focusout .updateCell': function(event){
		var tab_id = FlowRouter.getParam('id');
		var temp = event.target.value;
		event.target.outerHTML=temp;

		//Call method to update collection
		Meteor.call("updateDataTable", tab_id, temp, this.label, Session.get("editCell"));
	},
	'keypress .updateCell': function(event){
		if (event.keyCode==13) {
			var tab_id = FlowRouter.getParam('id');
			var temp = event.target.value;
			event.target.outerHTML=temp;
			
			//Call method to update collection
			Meteor.call("updateDataTable", tab_id, temp, this.label, Session.get("editCell"));
		}
	},
});