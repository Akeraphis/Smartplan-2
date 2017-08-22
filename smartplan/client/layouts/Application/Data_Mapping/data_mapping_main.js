Template.Applications_DataMapping.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var app_id = FlowRouter.getParam('id');
		self.subscribe("attributes_for_app", app_id);
		self.subscribe("facts_for_app", app_id);
		self.subscribe("links_dl_attributes_for_app", app_id);
		self.subscribe("links_dl_facts_for_app", app_id);
	})
});

Template.Applications_DataMapping.helpers({
	'getApp' : function(){
		return Applications.findOne({_id : FlowRouter.getParam('id')});
	},
});

Template.Applications_DataMapping.events({
	'dragstart .list-group-item': function(e){
		var column = ""
		_.forEach(this, function(letter){
			column = column+letter;
		});
		Session.set("att_dragged", {dt_id : e.target.parentNode.id, column : column});
	},
	'dropped .list-group': function(e, temp){
		e.preventDefault();
		var closestElem = getClosest(e.target, '.list-group-item');	
		var target_id = closestElem.href.split("#")[1]
		var dt = (Session.get("att_dragged")).dt_id;
		var col = (Session.get("att_dragged")).column;
		var parentAtt = Attributes.findOne({_id : target_id}).parent;
		Meteor.call("create_links_dt_attributes", FlowRouter.getParam("id"), dt, col, false, target_id, parentAtt);	
	},
});

/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
var getClosest = function ( elem, selector ) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
    }

    return null;
};