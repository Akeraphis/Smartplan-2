ValuesAssignments = new Mongo.Collection("valuesAssignments");


ValuesAssignments.allow({
	insert: function(userId, doc){
		return !!userId; //Authorize everybody who is logged in to add a data layer
	},
	update: function(userId, doc){
		return !!userId;
	},
});