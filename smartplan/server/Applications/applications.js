Meteor.methods({
	//---------------------------------------------------
	// Methods on Applications
	//---------------------------------------------------
	'create_New_App' : function(name, desc){
		return Applications.insert({name : name, desc : desc, author : this.userId, createdAt : new Date(), attributes : []});
	},
	'deleteApplication' : function(app_id){
		ValuesAssignments.remove({application : app_id});
		Attributes.remove({application : app_id});
		Applications.remove({_id : app_id});
	},
	//---------------------------------------------------
	// Methods on Applications
	//---------------------------------------------------
	'create_attribute' : function(app_id, name, type, desc, parent){
		var att_id = Attributes.insert({application : app_id, name : name, type : type, desc : desc, parent: parent, children : []})
		if(parent != 'None'){
			Attributes.update({_id : parent}, {$push : {children : att_id}});
			Meteor.call("create_all_values_assignments", parent, att_id);
		}
		Applications.update({_id : app_id}, {$push : {attributes : {_id : att_id}}});
		ValuesAssignments.insert({application : app_id, attribute : att_id, content : []});
		return att_id;
	},
	'edit_attribute' : function(att_id, name, type, desc, parent){
		var previous_parent = Attributes.findOne({_id : att_id}).parent;
		Attributes.update({_id : att_id}, {$set : {name : name, type : type, desc : desc}});
	},
	'delete_Att' : function(app_id, att_id){
		ValuesAssignments.remove({attribute : att_id});
		Applications.update({_id : app_id}, {$pull : {attributes : {_id : att_id}}});
		Attributes.update({_id : att}, {$pull : {children : att_id}});
		Attributes.update({parent : att_id}, {$set : {parent : "None"}});
		Attributes.remove({_id : att_id});
	},
	//---------------------------------------------------
	// Methods on Values
	//---------------------------------------------------
	'create_value' : function(app_id, att_id, value){
		var att = Attributes.findOne({_id : att_id});
		var content = {};
		_.forEach(att.children, function(c){
			var cname = Attributes.findOne({_id : c}).name
			content[c.name] = "";
		});
		var att_name= att.name;
		content[att.name]=value;
		ValuesAssignments.update({attribute : att_id},{$push : {content : content}});
	},
	"delete_value": function(val_id){
		//Values.remove({_id : val_id});
	},
	"create_all_values_assignments" : function(parent_id, child_id){
		var chi = Attributes.findOne({_id : child_id});
		var va = ValuesAssignments.findOne({attribute : parent_id});
		var contents = va.content;
		var res = [];
		var chi_name = chi.name;

		_.forEach(contents, function(c){
			c[chi_name] = "";
			res.push(c);
		});

		ValuesAssignments.update({attribute : parent_id}, {$set : {content : res}});
	},
	"getValues" : function(att_name){
		var id = Attributes.findOne({name : att_name})._id;
		content = ValuesAssignments.findOne({attribute : id}).content;
		var res = [];
		_.forEach(content, function(c){
			res.push(c[att_name]);
		})
		return res;
	},
	"updateValuesAssignments": function(att_id, value, column, newObj){
		console.log(att_id, value, newObj);
		var att_name = Attributes.findOne({_id : att_id}).name;
		var va = ValuesAssignments.findOne({attribute : att_id});
		res = [];
		_.forEach(va.content, function(c){
			if(c[att_name]==newObj[att_name]){
				c[column]=value;
			}
			res.push(c);
		});

		ValuesAssignments.update({attribute : att_id}, {$set : {content : res}});
	}
});

