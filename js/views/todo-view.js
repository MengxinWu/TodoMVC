// global Backbone var
var app = app || {};

(function () {
	// use strict mode
	"use strict";

	// create TodoView for a todo item
	app.TodoView = Backbone.View.extend({
		tagName: "li",

		// cache the template for a todo item
		template: _.template($("#item-template").html()),

		//  DOM events
		events: {
			"dbclick label":   "edit",
			"keypress .edit":  "updateOnEnter",
			"blur .edit":      "close",
			"click .toggle":   "toggleCompleted",
			"click .destroy":  "clear",
			"keydown .edit":   "revertOnEscape"
		},

		// TodoView listen for changes to its model Todo
		initialize: function() {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
			
			// ??? visible event from where ???
			this.listenTo(this.model, "visible", this.toggleVisible);
		},

		render: function() {

			//  ??? TodoView render twice ??? 
			if(this.model.changed.id !== undefined) {
				return;
			}

			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass("completed", this.model.get("completed"));
			this.toggleVisible();

			this.$input = this.$(".edit");
			return this;
		},

		toggleVisible: function() {
			this.$el.toggleClass("hidden", this.isHidden());
		},

		isHidden: function() {
			return this.model.get("completed") ?

			// ??? app.TodoFilter ???
				app.TodoFilter === "active" :
				app.TodoFilter === "completed";
		},

		// switch the view into editing mode
		edit: function() {
			this.$el.addClass("editing");
			this.$input.focus();
		},

		// close editing mode
		close: function() {
			var trimmedValue = this.$input.val().trim();
			
			if( value ) {
				this.model.save({ title: trimmedValue });
			} else {
				this.clear();
			}

			this.$el.removeClass("editing");
		},

		// enter and save the update
		updateOnEnter: function(e) {
			if(e.which === ENTER_KEY) {
				this.close();
			}
		},

		// toggle the completed state of the Todo item
		toggleCompleted: function() {
			this.model.toggle();
		},

		// remove the Todo item
		clear: function() {
			this.model.destroy();
		},

		// leave editing mode without saving the update
		revertOnEscape: function(e) {
			if(e.which === ESC_KEY) {
				this.$el.removeClass("editing");
				this.$input.val(this.model.get("title"));
			}
		}
	});
})();
