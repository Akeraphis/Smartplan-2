Meteor.methods({
	deleteCompany: function(id){
		console.log("------- Deleting Company :", id, ' -------');
		Companies.remove({_id : id});
	}
})