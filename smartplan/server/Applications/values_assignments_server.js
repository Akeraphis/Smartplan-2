Meteor.methods({
	
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
	//Create the values for a newly period attribute created
	"create_va_for_periods" : function(app_id, att_id, start, end, bucket){
		var content = [];

		console.log("bucket : ", bucket, start, end);

		//Truncate the start and end to the beginning of the day/week/month
		var truncStart = moment(start).startOf(bucket);
		var truncEnd = moment(end).startOf(bucket);
		
		content.push({bucket : truncStart.format("YYYY-MM-DD"), day : truncStart.format("D"), dayOfWeek: truncStart.format("dddd"), month : truncStart.format("MMMM"), year : truncStart.format("YYYY")});

		var temp = truncStart;
		while(temp.toDate()<truncEnd.toDate()){
			temp = temp.add(1, 'month');
			content.push({bucket : temp.format("YYYY-MM-DD"), day : temp.format("D"), dayOfWeek: temp.format("dddd"), month : temp.format("MMMM"), year : temp.format("YYYY")});
			console.log("temp : ", temp.toDate(), content);
		}

		console.log(truncStart.toDate(), truncEnd.toDate(), content);
		ValuesAssignments.insert({application : app_id, attribute : att_id, content : content});
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
	"createEmptyValuesAssignments" : function(parent_id, child_id){
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
		var att = Attributes.findOne({name : att_name});
		var res = [];
		if(att){
			var id = att._id;
			content = ValuesAssignments.findOne({attribute : id}).content;
			_.forEach(content, function(c){
				res.push(c[att_name]);
			});
		}
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
	"create_VA_from_parent_child": function(app_id, parent, child, child_name, assignment){
		var att_name = Attributes.findOne({_id : parent}).name;
		var va = ValuesAssignments.findOne({attribute : parent});
		res = [];
		_.forEach(va.content, function(c){
			if(c[att_name]==assignment["parent"]){
				c[child_name]=assignment["child"];
			}
			res.push(c);
		});

		ValuesAssignments.update({attribute : parent}, {$set : {content : res}});

	},
	"getAtt" : function(att_id){
		return Attributes.findOne({_id : att_id});
	},
})