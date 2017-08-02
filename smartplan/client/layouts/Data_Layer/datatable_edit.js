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
	'dblclick .reactive-table tbody tr': function (event) {
		// set the blog post we'll display details and news for
		var text = event.target.innerHTML;
		var input = document.createElement("input");
		input.className = "updateCell";
		input.type = "text";
		input.value = text;
		event.target.innerHTML="";
		event.target.parentNode.replaceChild(input, event.target);
		input.focus();
	},
	'focusout .updateCell': function(event){
		var temp = event.target.value;
		//event.target.parentNode.innerHTML=temp;
		console.log(event.target.parentNode, this);
	},
});