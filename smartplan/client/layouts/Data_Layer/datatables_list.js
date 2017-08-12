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
});