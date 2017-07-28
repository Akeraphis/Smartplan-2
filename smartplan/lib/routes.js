//Login & Logout of the application redirect
if(Meteor.isClient){
	Accounts.onLogin(function(){
		FlowRouter.go('applications');
	});

	Accounts.onLogout(function(){
		FlowRouter.go("home");
	});
};
//--------------------------------------------------------------

//Redirect to home for any url and if not logged-in
FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()) {
		FlowRouter.go('home');
	}
}]);
//--------------------------------------------------------------

//Routes
FlowRouter.route('/', {
	name : 'home',
	action() {
		if (Meteor.userId()) {
			FlowRouter.go('applications');
		}
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/dataLayer', {
	name : 'dataLayer',
	action() {
		BlazeLayout.render('MainLayout', {main: 'DataLayer_Main'});
	}
});

FlowRouter.route('/applications', {
	name : 'applications',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Applications_List'});
	}
});

FlowRouter.route('/market', {
	name : 'market',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Market_Main'});
	}
});

FlowRouter.route('/administration', {
	name : 'administration',
	action(){
		BlazeLayout.render('Administration_Main');
	}
});

FlowRouter.route('/administration/companies', {
	name : 'companies',
	action(){
		BlazeLayout.render('Administration_Main', {main: 'Companies_Main'});
	}
});

FlowRouter.route('/administration/companies/new', {
	name : 'companies',
	action(){
		BlazeLayout.render('Administration_Main', {main: 'Companies_New'});
	}
});
//--------------------------------------------------------------