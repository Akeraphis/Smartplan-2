Template.Attributes_list.helpers({
	'getName' : function(att_id){
		return Attributes.findOne({_id : att_id}).name;
	}
})