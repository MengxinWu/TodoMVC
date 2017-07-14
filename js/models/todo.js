// bind Model: Todo to the global variable: app
var app = app || {};

(function() {
	// use strict mode
	'use strict';

	// define Backbone Model: Todo  
	app.Todo = Backbone.Model.extend({

		// default attributes for the Model: Todo
		defaults: {
			title:      '',
			completed:  false
		},

		// toggle the Model attribute: 'completed'
		// more about Model.save() to see the Backbone.js website
		toggle: function() {
			this.save({ 
				completed: !this.get('completed') 
			});	
		}
	});
})();