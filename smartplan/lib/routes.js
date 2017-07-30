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

FlowRouter.route('/dataLayer/detail/:id', {
	name : 'dataLayer_detail',
	action() {
		BlazeLayout.render('MainLayout', {main: 'DataLayer_Detail'});
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

FlowRouter.route('/administration/profiles', {
	name : 'profiles',
	action(){
		BlazeLayout.render('Administration_Main', {main: 'Profiles_Main'});
	}
});

FlowRouter.route('/administration/companies/new', {
	name : 'new_company',
	action(){
		BlazeLayout.render('Administration_Main', {main: 'Companies_New'});
	}
});

FlowRouter.route('/administration/companies/update/:id', {
	name : 'update_company',
	action(){
		BlazeLayout.render('Administration_Main', {main: 'Company_Update'});
	}
});

FlowRouter.route('/administration/profiles/update/:id', {
	name : 'update_profile',
	action: function(params, queryParams){
		BlazeLayout.render('Administration_Main', {main: 'Profile_Update'});
	}
});

FlowRouter.route('/administration/companies/assign-users/:id', {
	name : 'assign_users',
	action: function(params, queryParams){
		BlazeLayout.render('Administration_Main', {main: 'Assign_Users'});
	}
});
//--------------------------------------------------------------