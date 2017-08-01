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
			/*for (z in worksheet) {
    				// all keys that do not begin with "!" correspond to cell addresses 
   					if(z[0] === '!') continue;
   					var log = "Sheet: " + y + ", cell: " + z + " = " + JSON.stringify(worksheet[z].v)
  				    //console.log(log);
  				    result += log + "\n";
  			};*/

  			result.push(excel.utils.sheet_to_json(worksheet, options));
		});

/*
		var options = { header : 1 };
		var workbook = excel.read(fileData);
		var yourSheetsName = workbook.SheetNames;
		var sheet = workbook.Sheets[yourSheetsName[0]]
		var workbookJson = excel.utils.sheet_to_json( sheet, options );*/

		return [sheet_name_list, result];

    }
})