Meteor.publish('dataLayers', function(){
	return DataLayers.find({author: this.userId}); //Publish only the datalayers to the person who created it
})