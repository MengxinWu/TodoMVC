// global Backbone var
var app = app || {};

(function() {
	// use strict mode
	"use strict";

	// define Todos collection and model is Todo
	var Todos = Backbone.Collection.extend({
		model: app.Todo,

		// save todo items under the LocalStorage
		localStorage: new Backbone.LocalStorage("todos-backbone"),

		// filter todo items that are finished
		completed: function(){
			return this.where({completed: true});
		},

		// filter todo items that are not finished
		remaining: function(){
			return this.where({completed: false});
		},

		// create the order num for new item
		nextOrder: function(){
			return this.length ? this.last().get("order") + 1 : 1;
		},

		// maintain the Todos in sorted order with order
		comparator: "order"
	});

	// instantiate the Todos collection
	app.todos = new Todos();
})();