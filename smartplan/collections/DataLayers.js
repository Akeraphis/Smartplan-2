DataLayers = new Mongo.Collection('dataLayers');

DataLayers.allow({
	insert: function(userId, doc){
		return !!userId; //Authorize everybody who is logged in to add a data layer
	}
});
