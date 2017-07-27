Companies = new Mongo.Collection('companies');

Companies.allow({
	insert: function(userId, doc){
		return !!userId; //Authorize everybody who is logged in to add a data layer
	}
});

Employee = new SimpleSchema({
	name : {
		type : String,
		label : 'Employee Name',
	},
	role : {
		type : String,
		label : 'Employee Role',
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
});

CompanySchema = new SimpleSchema({
	name : {
		type : String,
		label : 'Company Name',
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
	employees : {
		type: [Employee]
	},
});

Companies.attachSchema( CompanySchema );