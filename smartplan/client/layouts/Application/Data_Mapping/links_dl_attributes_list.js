Session.set('DLSelected', "");
Session.set('DTSelected', []);

Template.modalDLAtt.helpers({
	'getDL': function(){
		return DataLayers.find({});
	},
	'getDT': function(){
		if(Session.get("DLSelected")!=""){
			return DataLayers.findOne({_id : Session.get('DLSelected')}).dataTables;
		}
	},
	'getCols': function(){
		if(Session.get("DTSelected")){
			return Session.get("DTSelected");
		}
	},
	'getAtt': function(){
		return Attributes.find({application: FlowRouter.getParam('id')});
	},
	'notCheckedNewAtt': function(){
		var check = document.getElementById("check_new");
		if(check.checked){
			return false;
		}
		else{
			return true;
		}
	}
});

Template.modalDLAtt.events({
	'change #DL_selected': function(e){
		Session.set('DLSelected', document.getElementById("DL_selected").value);
		var dt = DataTables.findOne({_id : document.getElementById("DT_selected").value})
		if(dt){
			Session.set('DTSelected', Object.keys(dt.content[0]));
		}
	},
	'change #DT_selected': function(e){
		var dt = DataTables.findOne({_id : document.getElementById("DT_selected").value})
		if(dt){
			Session.set('DTSelected', Object.keys(dt.content[0]));
		}
	},
})