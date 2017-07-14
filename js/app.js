var app = app || {};

// define global variable: enter and esc key
var ENTER_KEY = 13;
var ESC_KEY = 27;

// jQuery ready()
$(function () {
	// use strict mode
	'use strict';

	// instantiate Backbone View: AppView to start the project
	new app.AppView();
});