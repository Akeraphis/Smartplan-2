Meteor.methods({
	//---------------------------------------------------
	// Methods on Facts
	//---------------------------------------------------
	"create_fact": function(app_id, name, type, desc){
		return Facts.insert({application : app_id, name : name, type : type, description : desc});
	},
	"remove_fact": function(fact_id){
		Facts.remove({_id : fact_id});
	},
	"update-fact" : function(sel, name, type, desc){
		Facts.update({_id : sel}, {$set : {name : name, type : type, description : desc}});
	}
})