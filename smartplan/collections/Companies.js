Companies = new Mongo.Collection('companies');

Companies.allow({
	insert: function(userId, doc){
		return !!userId; //Authorize everybody who is logged in to add a data layer
	},
	update: function(userId, doc){
		return !!userId;
	},
});

Employee = new SimpleSchema({
	_id : {
		type : String,
		label : "Employee ID"
	},
	name : {
		type : String,
		label : "Employee Name"
	},
	role : {
		type : String,
		label : "Employee Role"
	}
})

CompanySchema = new SimpleSchema({
	name : {
		type : String,
		optional : true,
		label : 'Company Name',
	},
	desc : {
		type : String,
		optional : true,
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
		optional: true,
		autoValue: function(){
			return this.userId
		},
		autoform: {
			type : "hidden"
		},
	},
	employees: {
		type : [Employee],
		optional: true,
		autoform : {
			type : "hidden"
		}
	}
});

Companies.attachSchema( CompanySchema );
