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
		var temp = event.target.innerHTML;
		var text = temp.replace(/\s/g, '&nbsp;');
		event.target.innerHTML = '<input type ="text" class="updateCell" value='+text+'>';
		event.target.focus();
	},
	'focusout .updateCell': function(event){
		var temp = event.target.value;
		var html = event.target.outerHTML;
		event.target.outerHTML = temp;
		console.log(temp, html, event, this);
	},
	'keypress input.updateCell': function(event){
		if(event.which==13){
			var temp = event.target.value;
			var html = event.target.outerHTML;
			event.target.outerHTML = temp;
			console.log(temp, html, event, this);
		}
	}
});