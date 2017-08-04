Session.set("tables_titles", []);

Template.DataTable_New.events({
	'change .uploadFile': function(event, template){
		console.log("Uploading File ...");
		FS.Utility.eachFile(event, function(file){
			var reader = new FileReader();
			reader.onload = function(fileLoadEvent) {
				Meteor.call('importFile', event.target.value, reader.result, function(error,result){
					console.log(result);
					Session.set("tables_titles", result[0]);
					Session.set("tables_content", result[1]);
				});
			};
			reader.readAsBinaryString(file);
		});
	},
	'click .import_tables' : function(){
		console.log("---- Importing tables into dataLayer ----");
		var dlId = FlowRouter.getParam('id');
		Meteor.call('importTables', dlId, Session.get("tables_titles"), Session.get("tables_content"), function(err, res){
			if(!err){
				Session.set("tables_titles", []);
				FlowRouter.go('/dataLayer');
			}
			else{
				console.log(err);
			}
		});
	}
});

Template.DataTable_New.helpers({
	tables : function(){
		return Session.get("tables_titles");
	},
});