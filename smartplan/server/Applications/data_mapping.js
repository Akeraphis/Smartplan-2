Meteor.methods({
	//---------------------------------------------------
	// Methods on Links DL Attributes
	//---------------------------------------------------
	"create_links_dt_attributes" : function(app_id, dt, col, isNewAtt, oldAtt){
		var attId = "";
		//if NewAtt is true, create the attribute and retrieve Id
		if(isNewAtt){
			attId = Meteor.call("create_attribute", app_id, col, "String", "imported from data layer", "None");
		}
		//else we just take the oldAtt id
		else{
			attId = oldAtt;
		}
		var lda = LinksDLAttributes.insert({application : app_id, attribute : attId, datatable : {_id : dt, column : col}});
	},
	"refresh_values_from_dl" : function(app_id){

		//find and sort lda
		var lda = LinksDLAttributes.find({application : app_id}, {sort : {"datatable._id": 1}}).fetch();
		
		//Loop on lda and create all values
		_.forEach(lda, function(ld){
			console.log(ld);
			Meteor.call("createValuesfromLda", app_id, ld);
		});
	},
	"createValuesfromLda" : function(app_id, ld){
		var dataTable = DataTables.findOne({_id : ld.datatable._id}).content;

		_.forEach(dataTable, function(c){
			Meteor.call('create_value', app_id, ld.attribute, c[ld.datatable.column]);
		});	
	},
});