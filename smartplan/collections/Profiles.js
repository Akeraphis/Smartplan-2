Profiles = new Mongo.Collection('profiles');

Profiles.allow({
	insert: function(userId, doc){
		return !!userId; //Authorize everybody who is logged in to add a data layer
	},
	update: function(userId, doc){
		return !!userId;
	},
});

/*
Email = new SimpleSchema({
	address : {
		type : String,
        regEx: SimpleSchema.RegEx.Email,
	}
});

User = new SimpleSchema({
})

ProfileSchema = new SimpleSchema({
	name : {
		type : String,
		label : 'User Name',
		optional : true,
	},
	role : {
		type : String,
		 label: 'Role',
		 optional: true,
	},
	emails: {
		type: [Email],
		optional: true,
	},
	user_id : {
		type: String,
		autoform:{
			type: "hidden",
		}
	}
});

Profiles.attachSchema( ProfileSchema );*/
