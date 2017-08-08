Template.Attributes_tables.helpers({
	'hasAtt' : function(){
		var res = false;
		var attid = FlowRouter.getParam("attid");
		if(attid){
			res = true;
		}
		return res;
	},
	'getAtt': function(){
		var attid = FlowRouter.getParam('attid');
		return Attributes.findOne({_id : attid});
	}
});
