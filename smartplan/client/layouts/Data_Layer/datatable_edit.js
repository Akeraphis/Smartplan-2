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
	'click .reactive-table tbody tr': function (event) {
		// set the blog post we'll display details and news for
		var post = this;
		Session.set('post', post);
		console.log(this, event.target);
		var temp = event.target.innerHTML;
		event.target.innerHTML = '<input type ="text" value='+temp+'>'
	},
});