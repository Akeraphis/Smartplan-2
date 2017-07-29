Meteor.publish('dataLayers', function(){
	return DataLayers.find({author: this.userId}); //Publish only the datalayers to the person who created it
});

Meteor.publish('companies', function(){
	return Companies.find({});
});

Meteor.publish('profiles', function(){
	return Profiles.find({});
});