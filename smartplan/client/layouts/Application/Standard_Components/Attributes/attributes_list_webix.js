Template.attributes_webix_list.rendered = function(){
	var app_id = FlowRouter.getParam('id');
	var att_id = FlowRouter.getParam('attid');
	var proxy2 = webix.proxy('meteor', ValuesAssignments.find());
	var proxy = webix.proxy("meteor", Attributes.find({application : app_id}));

	//datatable
	var attributes_list = {
		view : "list", 
		id:"mylist2",
		select:true, //enables selection 
		width: 300,
		height:400,
		autoconfig : true,
		template:"#name#",
		url: proxy,
		save : proxy
	};

	var values_table = {
		view:"datatable", 
		id:"mydatatable",
		select:true, //enables selection 
		width: 800,
		height:400,
		columns:[{
			id:"attribute", editor:"text", fillspace:1, sort:"string"
		},{
			id:"application", editor:"text", fillspace:1, sort:"string"
		}],
		url: proxy2,
		save : proxy2
	};

	var toolbar = {
		view:"toolbar",
		elements:[
			{ 
				view:"button", 
				value:"Add", 
				width:70, 
				id:"new-att", 
				click: function(){
					var app_id = FlowRouter.getParam("id");
				}
			},
			{ 
				view:"button", 
				value:"Remove", 
				width:70, 
				click:function(){
					var app_id = FlowRouter.getParam("id");
					var id = $$("mylist2").getSelectedId();
					webix.confirm({
						title: "Delete",// the text of the box header
						text: "Are you sure you want to delete the selected item?",
						callback: function(result) { 
							if(id && result){
								Meteor.call("delete_Att", app_id, id);
							}
							else if(result) {
								webix.message("Please select any row you want to delete first");
							}
						}
					});
				}
			}
		]
	};


	this.ui = webix.ui({
		rows:[
			{type : "header", template : "Attributes"}, 
			{cols : [
				{rows : [
					attributes_list,
					toolbar
				]},
				{view : "resizer"},
				values_table
			]}
		]
	}, this.find("#list_area_attributes"));

	//Reroute on selection of an attributes
	$$("mylist2").attachEvent("onAfterSelect", function(){
		var id = $$("mylist2").getSelectedId();
		var app_id = FlowRouter.getParam('id');
		FlowRouter.go('/applications/editor/'+app_id+'/'+id);
	});

	$$("mydatatable").bind( $$("mylist2") );

	//create data tracker, will reload data after any changes
		this.autorun(function(){
			var att_id = FlowRouter.getParam('attid');
			var va = ValuesAssignments.find({attribute : att_id}).fetch();
			if (va){
				$$("mydatatable").clearAll();
				$$("mydatatable").parse(va);
			}
		});
};