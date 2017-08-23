Meteor.methods({
	//---------------------------------------------------
	// Methods on Facts
	//---------------------------------------------------
	"create_fact": function(app_id, name, type, desc){
		return Facts.insert({application : app_id, name : name, type : type, description : desc});
	},
})