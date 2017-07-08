// global Backbone var
var app = app || {};

(function () {
	// use strict mode
	"use strict";	

	// create AppView as top-level UI
	app.AppView = Backbone.View.extend({
		el: "#todoapp",

		// this template is for statistics at the bottom
		statsTemplate: _.template($("#stats-template").html()),

		// DOM events
		events: {
			"keypress #new-todo":      "createOnEnter",
			"click #toggle-all":       "toggleAllComplete",
			"click #clear-completed":  "clearCompleted"
		},

		initialize: function() {
			this.allCheckbox = this.$("#toggle-all")[0];
			this.$input = this.$("#new-todo");
			this.$main = this.$("#main");
			this.$footer = this.$("#footer");

			this.listenTo(app.todos, "add", this.addOne);
			this.listenTo(app.todos, "reset", this.addAll);

			this.listenTo(app.todos, "changed:completed", this.filterOne);
			this.listenTo(app.todos, "filter", this.filterAll);
			this.listenTo(app.todos, "all", this.render);

			app.todos.fetch({reset: true});
		},

		render: function() {
			var completed = app.todos.completed().length;
			var remaining = app.todos.remaining().length;

			if(app.todos.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html( this.statsTemplate({
					completed: completed,
					remaining: remaining
				}) );

			} else {
				this.$main.hide();
				this.$footer.hide();
			}
		},

		addOne: function( todo ) {
			var view = new app.TodoView({ model: todo });
			$("#todo-list").append( view.render().el );
		},

		addAll: function() {
			$("#todo-list").html("");
			app.Todos.each( this.addOne, this );
		},

		filterOne: function( todo ) {
			todo.trigger("visible");
		},

		filterAll: function() {
			app.Todos.each( this.filterOne, this );
		},

		newAttributes: function() {
			return {
				title: this.$input.val().trim(),
				order: app.Todos.nextOrder(),
				completed: false
			};
		},

		createOnEnter: function( event ) {
			if( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
				return;
			}

			app.Todos.create( this.newAttributes() );
			this.$input.val("");
		},

		clearCompleted: function() {
			_.invoke(app.Todos.completed(), "destroy");
			return false;
		},

		toggleAllComplete: function() {
			var completed = this.allCheckbox.checked;

			app.Todos.each(function(todo) {
				todo.save({
					"completed": completed
				});
			});
		}
	});
})();


