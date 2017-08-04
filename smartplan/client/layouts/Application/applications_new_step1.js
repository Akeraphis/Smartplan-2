Template.Applications_New_Step1.events({
	'click .new_app_go_step2' : function(event){
		var name = document.getElementById('app-name').value;
		var app_id = Meteor.call("create_New_App", name, function(err, id){
			if(!err){FlowRouter.go('/applications/new_step_2/'+id);}
			else{console.log(err);}
		});
		
	}
});