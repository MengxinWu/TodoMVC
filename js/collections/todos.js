var app = app || {};

(function() {
	// use strict mode
	'use strict';

	// define Backbone Collection: Todos
	var Todos = Backbone.Collection.extend({

		// specify Model: Todo that Collection: Todos contains
		model: app.Todo,

		// save Todo items under the LocalStorage
		// the truth is that using database
		localStorage: new Backbone.LocalStorage('todos-backbone'),

		// filter Todo items that are finished
		// Collection.where() return an array that match attributes passed
		completed: function(){
			return this.where({completed: true});
		},

		// filter Todo items that are not finished
		remaining: function(){
			return this.where({completed: false});
		},

		// generate the order num for new Todo item
		// Collection.last() return the last Model: Todo
		nextOrder: function(){
			return this.length ? this.last().get('order') + 1 : 1;
		},

		// maintain Collection in sorted order: order
		comparator: 'order'
	});

	// bind Collection: todos to the global variable: app
	app.todos = new Todos();
})();