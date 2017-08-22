Template.accordeon_list_DL.helpers({
	'getDataLayers': function(){
		return DataLayers.find({});
	},
	'getDTColumns': function(id){
		var dts = DataTables.findOne({_id : id})
		if(dts){
			var dt0 = dts.content[0];
			return Object.keys(dt0);
		}
	},
	'isLinkedToAttOrTs' : function(col){
		var app_id = FlowRouter.getParam('id');
		if(app_id){
			var res = false;
			var lda = LinksDLAttributes.find({application : app_id, "datatable._id": Template.parentData(1).dt_id, "datatable.column": col}).fetch();
			var ldf = LinksDLFacts.find({application : app_id, "datatable._id": Template.parentData(1).dt_id, "datatable.column": col}).fetch();

			if(lda.length>0 || ldf.length>0){
				res = true;
			}

			return res;
		}
		else{
			return true;
		}
	}
});