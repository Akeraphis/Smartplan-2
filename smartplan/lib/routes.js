FlowRouter.route('/', {
	name : 'home',
	action() {
		console.log('test');
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/dataLayer', {
	name : 'dataLayer',
	action() {
		BlazeLayout.render('MainLayout', {main: 'DataLayer_Main'});
	}
});