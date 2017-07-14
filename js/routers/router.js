var app = app || {};

(function() {
	// use strict mode
	'use strict';

	// define Backbone Router: TodoRouter
	var TodoRouter = Backbone.Router.extend({

		// map URLs to call func defined
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function(param) {
			app.TodoFilter = param || '';

			app.todos.trigger('filter');
		}
	});

	// instantiate Backbone Router: TodoRouter and bind to global variable: app
	app.TodoRouter = new TodoRouter();

	// history handle haschange events and trigger callback 
	Backbone.history.start();
})();