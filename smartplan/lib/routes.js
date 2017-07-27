FlowRouter.route('/', {
	name : 'home',
	action() {
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