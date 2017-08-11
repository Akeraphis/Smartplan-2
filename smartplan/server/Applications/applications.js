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
	// Methods on Attributes
	//---------------------------------------------------
	'create_attribute' : function(app_id, name, type, desc, parent){
		var att_id = Attributes.insert({application : app_id, name : name, type : type, desc : desc, parent: parent, children : []})
		if(parent != 'None'){
			Attributes.update({_id : parent}, {$push : {children : {_id : att_id}}});
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
		
		//Delete VA
		ValuesAssignments.remove({attribute : att_id});
		
		//Remove attribute reference in the application
		Applications.update({_id : app_id}, {$pull : {attributes : {_id : att_id}}});
		
		//Remove references in VA
		Meteor.call("getAtt", att_id, function(err, res){
			if(!err){
				if(res.parent != "None"){
					var content = ValuesAssignments.findOne({attribute : res.parent}).content;
					var res2 = [];
					var att_name = res.name;
					_.forEach(content, function(c){
						delete c[att_name];
						res2.push(c);
					});
					ValuesAssignments.update({attribute : res.parent}, {$set : {content : res2}});
				}
			}
		});

		//Remove reference of child in other attributes
		Attributes.update({application : app_id}, {$pull : {children : { _id : att_id}}});

		//Remove reference of parents
		Attributes.update({parent : att_id}, {$set : {parent : "None"}});

		//Remove attribute
		Attributes.remove({_id : att_id});
	},
	'create_att_from_dl': function(dts){
		_.forEach(dts, function(dt){
			var dt0 = (DataTables.findOne({_id : dt}).content)[0];
			console.log(Object.keys(dt0))
		});
	},
	//---------------------------------------------------
	// Methods on Values
	//---------------------------------------------------
	'create_value' : function(app_id, att_id, value){
		var att = Attributes.findOne({_id : att_id});
		var content = {};
		_.forEach(att.children, function(c){
			var cname = Attributes.findOne({_id : c._id}).name
			content[c.name] = "";
		});
		var att_name= att.name;
		content[att.name]=value;
		ValuesAssignments.update({attribute : att_id},{$push : {content : content}});
	},
	"deleteValue": function(app_id, att_id, val){
		var att = Attributes.findOne({_id : att_id});
		var att_name = att.name;
		var content = ValuesAssignments.findOne({attribute : att_id}).content;
		var res = [];

		//Update the VA where the value is deleted
		_.forEach(content, function(c){
			if(c[att_name] != val[att_name]){
				res.push(c);
			}
		});

		ValuesAssignments.update({attribute : att_id},{$set : {content : res}});

		//Update all VA where the value deleted is assigned
		var att_parent = att.parent;
		var va = ValuesAssignments.findOne({attribute : att_parent});
		var res=[];

		_.forEach(va.content, function(c){
			
			if(c[att_name]==val[att_name]){
				c[att_name] = "";
			}
			res.push(c);
		});

		ValuesAssignments.update({attribute : att_parent}, {$set : {content : res}});
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
	},
	"getAtt" :function(att_id){
		return Attributes.findOne({_id : att_id});
	}
});

