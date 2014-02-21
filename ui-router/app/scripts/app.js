'use strict';

var app = angular.module('app', ['ui.router']);

// ma i servizi non sono che dei facade? mmh...
app.factory('poster', function() {
	var service;
	
	var poster = {
		text:''
	}
	
	service = {
		setText: function(text)
		{
			poster.text = text;
			return text;
		},
		getText: function()
		{
			return poster.text;
		},
		getAll: function()
		{
			return poster;
		}
	};

	return service;
}); 


app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/editor");

	// EDITOR
	$stateProvider
	.state('editor',
	{
		url : "/editor",
		templateUrl : "views/partials/poster/editor.html",
		controller: function($scope,poster)
		{
			$scope.debugger = function(variable)
			{
				var posterDebug = poster.getAll();
				console.log(posterDebug)
			}
		}
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
		controller : function($scope,poster) {
			$scope.$watch(
				"text",
				function(newvalue,oldvalue)
				{
					poster.setText(newvalue);
				}
			);
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