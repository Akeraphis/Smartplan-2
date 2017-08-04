Meteor.publish('dataLayers', function(){
	return DataLayers.find({}); //Publish only the datalayers to the person who created it
});

Meteor.publish('companies', function(){
	return Companies.find({});
});

Meteor.publish('profiles', function(){
	return Profiles.find({});
});

Meteor.publish('dataTables', function(){
	return DataTables.find({});
});

Meteor.publish('applications', function(){
	return Applications.find({});
})