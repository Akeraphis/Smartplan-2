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

// Routes
// Main Application
FlowRouter.route('/', {
	name : 'home',
	action() {
		if (Meteor.userId()) {
			FlowRouter.go('applications');
		}
		BlazeLayout.render('HomeLayout');
	}
});
//--------------------------------------------------------------

// Routes Data Layer
FlowRouter.route('/dataLayer', {
	name : 'dataLayer',
	action() {
		BlazeLayout.render('MainLayout', {main: 'DataLayer_Main'});
	}
});

FlowRouter.route('/dataLayer/newTable/:id', {
	name : 'dataTable_new',
	action() {
		BlazeLayout.render('MainLayout', {main: 'DataTable_New'});
	}
});

FlowRouter.route('/dataLayer/editTable/:id', {
	name : 'editTable',
	action(){
		BlazeLayout.render('MainLayout', {main: 'DataTable_Edit'});
	}
});
//--------------------------------------------------------------

// Routes Application
FlowRouter.route('/applications', {
	name : 'applications',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Applications_List'});
	}
});

FlowRouter.route('/applications/new_step1', {
	name : 'applications_new_step1',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Applications_New_Step1'});
	}
});

FlowRouter.route('/applications/new_step_2/:id', {
	name : 'applications_new_step2',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Applications_New_Step2'});
	}
});


FlowRouter.route('/applications/new_step_2/:id/:attid', {
	name : 'applications_new_step2_av',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Applications_New_Step2'});
	}
});

FlowRouter.route('/applications/new_step_3/:id', {
	name : 'applications_new_step3',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Applications_New_Step3'});
	}
});

FlowRouter.route('/applications/new_step_3/:id/:attid', {
	name : 'applications_new_step3_av',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Applications_New_Step3'});
	}
});

FlowRouter.route('/applications/main/:id', {
	name : 'applications_main',
	action(){
		BlazeLayout.render('ApplicationLayout', {main: 'Applications_View'});
	}
});

FlowRouter.route('/applications/editor/:id', {
	name : 'applications_editor',
	action(){
		BlazeLayout.render('ApplicationLayout', {main: 'Applications_Editor'});
	}
});

FlowRouter.route('/applications/editor/:id/:attid', {
	name : 'applications_editor_av',
	action(){
		BlazeLayout.render('ApplicationLayout', {main: 'Applications_Editor'});
	}
});
//--------------------------------------------------------------

// Routes Market
FlowRouter.route('/market', {
	name : 'market',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Market_Main'});
	}
});
//--------------------------------------------------------------

// Routes Administration
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