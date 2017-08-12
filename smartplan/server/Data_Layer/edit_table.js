Meteor.methods({
	'updateDataTable' : function(tab_id, newVal, col, oldVals){
		var table = DataTables.findOne({_id : tab_id}).content;
		var content = [];
		_.forEach(table, function(elem){
			if(JSON.stringify(elem)==JSON.stringify(oldVals)){
				elem[col] = newVal;
			}
			content.push(elem);
		});
		DataTables.update({_id: tab_id}, {content : content});
	}
});