'use strict';

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/editor");

	// EDITOR
	$stateProvider
	.state('editor',
	{
		url : "/editor",
		templateUrl : "views/partials/poster/editor.html"
	})
	.state('editor.slide',
	{
		url : "/slide",
		templateUrl : "views/partials/poster/editor/slide.html"
	})
	.state('editor.slide.tools',
	{
		url : "/tools",
		templateUrl : "views/partials/poster/editor/slide/tools.html"
	})
	.state('editor.slide.tools.text',
	{
		url : "/text",
		templateUrl : "views/partials/poster/editor/slide/tools/text.html",
		controller : function($scope) {
		 
		}
	})
	.state('editor.slide.tools.font',
	{
		url : "/font",
		templateUrl : "views/partials/poster/editor/slide/tools/font.html",
		controller : function($scope) {
			$scope.$parent.text = $scope.text;
		}
	})
	.state('editor.slide.tools.color',
	{
		url : "/color",
		templateUrl : "views/partials/poster/editor/slide/tools/color.html",
		controller : function($scope) {
			
		}
	})
	.state('editor.slide.tools.image',
	{
		url : "/image",
		templateUrl : "views/partials/poster/editor/slide/tools/image.html",
		controller : function($scope) {
			
		}
	})
	.state('editor.slide.tools.wand',
	{
		url : "/wand",
		templateUrl : "views/partials/poster/editor/slide/tools/wand.html",
		controller : function($scope) {
			
		}
	});

});