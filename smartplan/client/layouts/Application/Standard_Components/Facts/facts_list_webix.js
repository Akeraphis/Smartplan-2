Template.facts_webix_list.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe("values_assignments_for_app", id);
	})
});

Template.facts_webix_list.rendered = function(){
	var app_id = FlowRouter.getParam('id'); 
	var proxy = webix.proxy("meteor", Facts.find({application : app_id}));

	//datatable
	var facts_list = {cols:[
			{	
				view:"form", 
				id:"myform", 
				width: 180, 
				elements:[
					{ 
						view:"text", 
						name:"name", 
						id : "ft-name", 
						placeholder:"Name", 
						width:180, 
						align:"center"
					}, 
					{ 
						view:"text", 
						name:"description",
						id : "ft-desc",
						placeholder:"Description", 
						width:180, 
						align:"center"
					},
					{ 
						view:"richselect", 
						name:"type",
						id: "ft-type",
						options:[
							{id:"Imported", value:"Imported"}, 
							{id:"Calculated", value:"Calculated"}
						], 
						placeholder:"Type",
						align:"center"
					}
				]
			},
			{
				view:"list", 
				id:"mylist",
				template:"#name# - #type#", 
				select:true, //enables selection 
				width: 250,
				height:400,
				url: proxy,
				save : proxy
			} 
		]};

	var toolbar = {
		view:"toolbar",
		elements:[
			{ 
				view:"label", 
				label:"Facts"
			},
			{ 
				view:"button", 
				value:"Add", 
				width:70, 
				id:"new-fact", 
				click: function(){
					var app_id = FlowRouter.getParam("id");
					if($$("ft-name").data.value && $$("ft-type").data.value && $$("ft-desc").data.value){
						Meteor.call("create_fact", app_id, $$("ft-name").data.value, $$("ft-type").data.value, $$("ft-desc").data.value);
					}
					else{
						webix.message("Make sure you fill all fields before submitting");
					}
				}
			},
			{ 
				view:"button", 
				value:"Update", 
				width:70, 
				id:"update-fact", 
				click: function(){
					var sel = $$("mylist").getSelectedId();
					if(!sel) return;
							
					var name = $$("ft-name").data.value;
					var type = $$("ft-type").data.value;
					var desc = $$("ft-desc").data.value;
						
					var item = $$("mylist").getItem(sel); //selected item object
				
					if($$("ft-name").data.value && $$("ft-type").data.value && $$("ft-desc").data.value){
						Meteor.call("update-fact", sel, name, type, desc);
					}
					else{
						webix.message("Make sure you fill all fields before submitting");
					}
				}
			},
			{ 
				view:"button", 
				value:"Remove", 
				width:70, 
				click:function(){
					var id = $$("mylist").getSelectedId();
					webix.confirm({
						title: "Delete",// the text of the box header
						text: "Are you sure you want to delete the selected item?",
						callback: function(result) { 
							if(id && result){
								Meteor.call("remove_fact", id);
							}
							else if(result) {
								webix.message("Please select any row you want to delete first");
							}
						}
					});
				}
			},
			{ 
				view:"button", 
				value:"Clear Form", 
				width:100, 
				click:"$$('mylistyform').clear()"
			}
		]
	};

	this.ui = webix.ui({
		rows:[toolbar, facts_list]
	}, this.find("#table_area_facts"));

	//Attach events to listen upon clicking on a row, in order to update the form
	$$("mylist").attachEvent("onAfterSelect", function(){
		var id = $$("mylist").getSelectedId();

		var f = Facts.findOne({_id : id});
		$$("myform").setValues({
			name : f.name,
			description : f.description,
			type : f.type,
		});
	});
};


Template.facts_webix_list.destroyed = function(){
	if (this.ui) this.ui.destructor();
};