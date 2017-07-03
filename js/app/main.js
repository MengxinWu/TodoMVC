var PageIssueList = BasePage.extend({
	el: "#page-issiue-list"

});

var PageIssueCreate = BasePage.extend({
	el: "#page-issiue-create"

});

var PageIssueEidt = BasePage.extend({
	el: "#page-issiue-edit"

});

var AppRouter = Backbone.Router.extend({
	
	initialize: function(){
		this.pageIssueList = new PageIssueList();
		this.pageIssueCreate = new PageIssueCreate();
		this.pageIssueEidt = new PageIssueEidt();
	},

	hideAllPages: function(){
		this.pageIssueList.hide();
		this.pageIssueCreate.hide();
		this.pageIssueEidt.hide();
	},

	routes: {
		"issue/new": "issueCreate",
		"issue/:id": "issueEdit",
		"": "issiueList"
	},

	issueEdit: function(id) {
		console.log(id);
		this.hideAllPages();
		this.pageIssueEidt.show();
	},

	issueCreate: function(){
		this.hideAllPages();
		this.pageIssueCreate.show();
	},

	issiueList: function(){
		this.hideAllPages();
		this.pageIssueList.show();
	}
});

var router = new AppRouter();
Backbone.history.start();