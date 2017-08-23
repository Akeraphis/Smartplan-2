Meteor.methods({
	//---------------------------------------------------
	// Methods on Facts
	//---------------------------------------------------
	//Import timeseries values from DL
	'refresh_timeseries_from_dl' : function(app_id){
		var facts = Facts.find({application : app_id, type : "Imported"}).fetch();

		//for each imported facts of the application
		_.forEach(facts, function(f){
			Meteor.call("create_ts_from_ldf", app_id, f);
		})

		return facts;
	},
	'create_ts_from_ldf': function(app_id, fact){
		if(fact){
			//find links for a specified fact
			Meteor.call("find_links_from_fact", fact._id, function(err, res){
				if(!err){
					//for each links for the specified app in between dl and a specified fact
					_.forEach(res, function(link){
						// Find the datatable
						var dt = DataTables.findOne({_id : link.datatable._id});
						if(dt){
							var content = dt.content;
							Meteor.call("create_timeseries_from_dt", app_id, fact, dt._id, content, link);
						}
					})
				}
			});
		}
	},
	'find_links_from_fact' : function(factid){
		return LinksDLFacts.find({fact : factid}).fetch();
	},
	"create_timeseries_from_dt": function(app_id, fact, dt_id, content, link){

		var res = [];

		// Step 1. Isolate the attributes linked to this table ad retrieve the attributes
		var lda = LinksDLAttributes.find({"datatable._id" : dt_id}).fetch();
		var FU = [];
		var period = {};
		_.forEach(lda, function(l){
			var att = Attributes.findOne({_id : l.attribute});
			if(att.type != "Period"){
				FU.push({_id : att._id, name : att.name, link_id : l.datatable._id, link_name : l.datatable.column});
			}
			else{
				period = {_id : att._id, name : att.name, link_id : l.datatable._id, link_name : l.datatable.column}
			}
		});

		//Step 2. Browse through each line of the table
		_.forEach(content, function(c){	
			var obj = {application : app_id, fact : fact._id};
			//Find Forecast Unit
			_.forEach(FU, function(f){
				obj[f.name] = c[f.link_name];
			});
				
			//Step 3. Find out if the timeseries is already existing, if not create it
			var newVal = {};
			var t = c[period.link_name];
			newVal[t] = c[link.datatable.column];

			Timeseries.update(obj, {$push : {values : newVal} }, {upsert : true});

		});
	},
});