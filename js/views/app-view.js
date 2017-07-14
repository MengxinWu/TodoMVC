// bind Backbone View: AppView to global variable app
var app = app || {};

(function () {
	// use strict mode
	'use strict';	

	// define Backbone View: AppView
	app.AppView = Backbone.View.extend({

		// bind AppView to the existing DOM element
		el: ".todoapp",

		// cache template for statistics view
		statsTemplate: _.template($("#stats-template").html()),

		// specify DOM events
		events: {
			'keypress .new-todo':      'createOnEnter',
			'click .toggle-all':       'toggleAllComplete',
			'click .clear-completed':  'clearCompleted'
		},

		// when new AppView to call this func
		initialize: function() {
			this.$input = this.$(".new-todo");
			this.$main = this.$(".main");
			this.allCheckbox = this.$(".toggle-all")[0];
			this.$list = this.$(".todo-list");
			this.$footer = this.$(".footer");

			// bind to events on the Collection: Todos
			this.listenTo(app.todos, "add", this.addOne);
			this.listenTo(app.todos, "reset", this.addAll);
			this.listenTo(app.todos, 'changed:completed', this.filterOne);
			this.listenTo(app.todos, "filter", this.filterAll);

			// debounce() used to optimize performance and more see in Underscore.js
			this.listenTo(app.todos, 'all', _.debounce(this.render, 0));

			// ??? reset: true ???
			app.todos.fetch({reset: true});
		},

		// refresh the data to render AppView
		render: function() {
			var completed = app.todos.completed().length;
			var remaining = app.todos.remaining().length;

			if(app.todos.length) {
				this.$main.show();
				this.$footer.show();
				this.$footer.html(this.statsTemplate({
					completed: completed, 
					remaining: remaining
				}));

				// add class: 'selected' on app.TodoFilter defined in AppRouter
				this.$('.filters li a').
					removeClass('selected')
					.filter('[href="#/' + (app.TodoFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		// create new Model: Todo on Collection: Todos
		createOnEnter: function(e) {
			if(e.which === ENTER_KEY && this.$input.val().trim()) {

				// create Model within Collection and trigger event: 'add' and 'all'
				app.todos.create(this.newAttributes());

				// clear the input content
				this.$input.val('');
			}
		},

		// return attributes object of a Model: Todo
		newAttributes: function() {
			return {
				title: this.$input.val().trim(),
				order: app.todos.nextOrder(),
				completed: false
			};
		},		

		// when collection trigger "add" event to call this func
		// create new View: TodoView to append the list 
		addOne: function(todo) {
			var todoView = new app.TodoView({ model: todo });
			this.$list.append(todoView.render().el);
		},

		// toggle all Models: Todo attribute: 'completed'
		toggleAllComplete: function() {
			var completed = this.allCheckbox.checked;

			// Model.save() method trigger event: 'change' and 'add'
			app.todos.each(function(todo) {
				todo.save({
					completed: completed
				});
			});
		},

		// when the Model: Todo attribute: 'completed' change and call this func
		filterOne: function(todo) {

			// manual trigger custom event 'visible' defined in TodoView
			// and to hide Todo item
			todo.trigger('visible');
		},


		// when collection trigger 'reset' event to call this func
		// create TodoView for each Todo item
		addAll: function() {
			this.$list.html('');
			app.todos.each(this.addOne, this);
		},

		// this func is triggered in TodoRouter to hide some Todo items
		filterAll: function() {
			app.todos.each(this.filterOne, this);
		},

		// destroy the Models: Todo which attribute: 'completed' is true
		clearCompleted: function() {
			// invoke: call the event 'destroy' on each Model: Todo 
			// and trigger 'all' event to render AppView
			_.invoke(app.todos.completed(), 'destroy');

			// ??? why return false ???
			return false;
		}

	});
})();