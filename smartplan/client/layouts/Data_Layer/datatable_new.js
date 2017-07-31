Template.DataTable_New.events({
	'change .uploadFile': function(event, template){
		console.log("Uploading File ...");
		FS.Utility.eachFile(event, function(file){
			var reader = new FileReader();
			reader.onload = function(fileLoadEvent) {
				Meteor.call('importFile', event.target.value, reader.result, function(error,result){
					alert(result);
				});
			};
			reader.readAsBinaryString(file);
		});
	}
});