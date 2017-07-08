// global Backbone var
var app = app || {};

(function() {
	// use strict mode
	"use strict";

	// create Todo model: "title", "order", "completed"  
	app.Todo = Backbone.Model.extend({
		// set the default attr. for the todo
		defaults: {
			title:      "",
			completed:  false
		},

		// toggle the completed state of this model
		toggle: function() {
			this.save({ 
				completed: !this.get("completed") 
			});	
		}
	});
})();