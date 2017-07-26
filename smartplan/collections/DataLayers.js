DataLayers = new Mongo.Collection('dataLayers');

DataLayers.allow({
	insert: function(userId, doc){
		return !!userId; //Authorize everybody who is logged in to add a data layer
	}
});


DataTable = new SimpleSchema({
	name : {
		type : String,
		label : "Data Table Name"
	},
	desc : {
		type : String,
		label : "Description"
	},
	createdAt: {
		type: Date,
		label : "Created At",
		autoValue: function(){
			return new Date()
		},
		autoform: {
			type : "hidden"
		}
	}
});

DataLayerSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Data Layer Name",
	},
	createdAt: {
		type: Date,
		label :"Created At",
		autoValue: function(){
			return new Date()
		},
		autoform: {
			type : "hidden"
		}
	},
	author: {
		type: String,
		label : "Author",
		autoValue: function(){
			return this.userId
		},
		autoform: {
			type : "hidden"
		}
	},
	dataTables : {
		type : [DataTable]
	}

});


DataLayers.attachSchema( DataLayerSchema );