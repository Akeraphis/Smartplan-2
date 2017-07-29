Companies = new Mongo.Collection('companies');

Companies.allow({
	insert: function(userId, doc){
		return !!userId; //Authorize everybody who is logged in to add a data layer
	},
	update: function(userId, doc){
		return !!userId;
	},
});

CompanySchema = new SimpleSchema({
	name : {
		type : String,
		label : 'Company Name',
	},
	desc : {
		type : String,
		 label: 'Description',
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
		},
	},
});

Companies.attachSchema( CompanySchema );
