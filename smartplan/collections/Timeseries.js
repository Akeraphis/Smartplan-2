Timeseries = new Mongo.Collection("timeseries");


Timeseries.allow({
	insert: function(userId, doc){
		return !!userId; //Authorize everybody who is logged in to add a data layer
	},
	update: function(userId, doc){
		return !!userId;
	},
	remove: function(userId, doc){
		return !!userId;
	},
});