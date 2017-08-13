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
});