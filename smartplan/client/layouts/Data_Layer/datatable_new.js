Session.set("tables", []);

Template.DataTable_New.events({
	'change .uploadFile': function(event, template){
		console.log("Uploading File ...");
		FS.Utility.eachFile(event, function(file){
			var reader = new FileReader();
			reader.onload = function(fileLoadEvent) {
				Meteor.call('importFile', event.target.value, reader.result, function(error,result){
					console.log(result);
					Session.set("tables", result[0]);
				});
			};
			reader.readAsBinaryString(file);
		});
	},
	'click .import_tables' : function(){
		console.log("test");
	}
});

Template.DataTable_New.helpers({
	tables : function(){
		return Session.get("tables");
	},
});