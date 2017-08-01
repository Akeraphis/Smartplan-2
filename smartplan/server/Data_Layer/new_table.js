Meteor.methods({
	
	importFile: function(file, fileData){


		var excel;
		if(file.indexOf("xlsx") > -1){
			excel = new Excel('xlsx')
		}else {
			excel = new Excel('xls')
		}

		
        var workbook = excel.read(fileData, {type: 'binary'});

		var result = [];
		var sheet_name_list = workbook.SheetNames;
		var options = {}
		sheet_name_list.forEach(function(y) { // iterate through sheets 
  			var worksheet = workbook.Sheets[y];
  			result.push(excel.utils.sheet_to_json(worksheet, options));
		});

		return [sheet_name_list, result];

    },

    importTables: function(dl, titles, contents){
    	console.log("--- Importing data tables ", titles, " in data layer", dl, " ---");
    	var i=0;
    	_.forEach(titles, function(tl){
    		var dt = DataTables.insert({dataLayer : dl, name : tl, content : contents[i]});
    		DataLayers.update({_id : dl}, {$push : {dataTables : {name : tl, dt_id : dt}}});
    		i++;
    	});

    }
});