// bind View: TodoView to global variable: app
var app = app || {};

(function () {
	// use strict mode
	'use strict';

	// define Backbone View: TodoView for each Todo item
	app.TodoView = Backbone.View.extend({

		// create DOM element: li
		tagName: 'li',

		// cache the template for each Todo item
		template: _.template($('#item-template').html()),

		// specify DOM events
		events: {
			'click .toggle':   'toggleCompleted',
			'dblclick label':   'edit',
			'click .destroy':  'clear',
			'keypress .edit':  'updateOnEnter',
			'keydown .edit':   'revertOnEscape',
			'blur .edit':      'close'
		},

		// TodoView listen for changes to Todo item
		initialize: function() {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			
			// define custom event 'visible'
			this.listenTo(this.model, "visible", this.toggleVisible);
		},

		render: function() {

			//  ??? TodoView render twice ??? 
			if(this.model.changed.id !== undefined) {
				return;
			}

			this.$el.html(this.template(this.model.toJSON()));

			// jQuery toggleClass() to add or remove class style
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.toggleVisible();
			this.$input = this.$('.edit');
			return this;
		},


		// toggle the completed state of Todo item
		toggleCompleted: function() {
			this.model.toggle();
		},

		// toggle visivle of Todo item when select: all, active, completed
		toggleVisible: function() {

			// jQuery toggleClass() to add or remove class style
			this.$el.toggleClass('hidden', this.isHidden());
		},

		// judge the TodoFilter(from router.js) to decide the visible state of Todo item
		isHidden: function() {
			return this.model.get('completed') ?
				app.TodoFilter === 'active' :
				app.TodoFilter === 'completed';
		},

		// switch the view into editing mode
		edit: function() {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		// close editing mode
		close: function() {
			var trimmedValue = this.$input.val().trim();
			
			if(trimmedValue) {
				this.model.save({ title: trimmedValue });
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		},

		// enter and save the update
		updateOnEnter: function(e) {
			if(e.which === ENTER_KEY) {
				this.close();
			}
		},

		// remove the Todo item
		clear: function() {
			this.model.destroy();
		},

		// leave editing mode without saving the update
		revertOnEscape: function(e) {
			if(e.which === ESC_KEY) {
				this.$el.removeClass('editing');
				this.$input.val(this.model.get('editing'));
			}
		}
	});
})();