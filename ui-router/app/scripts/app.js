'use strict';

var app = angular.module('app', ['ui.router']);

// ma i servizi non sono che dei facade? mmh...
app.factory('poster', function() {
	var services;
	
	var slides = {
		text: '',
		font: '',
		color: {
			slideFore: '',
			slideBack: '',
			docFore: '',
			docBack: ''
		},
		wand: {
			
		}		
	}
	
	services = {
		
		// text
		setText: function(text)
		{
			slides.text = text;
		},
		getText: function()
		{
			return slides.text;
		},
		
		// color
		setColor: function(param,color)
		{
			slides.color[param] = color;
		},
		getColor: function(param)
		{
			return slides.color[param];
		},
		
		// font
		setFont: function(font)
		{
			slides.font = font;
		},
		getFont: function()
		{
			return slides.font;
		}

	};

	return services;
}); 


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
		controller : function($scope,poster,resolvedData)
		{
			// recupero lo stato
			$scope.text = resolvedData.text;
			
			// osservo i cambiamenti
			$scope.$watch(
				"text",
				function(newvalue,oldvalue)
				{
					poster.setText(newvalue);
				}
			);
		},
		resolve:
		{
			resolvedData: function(poster)
			{
				return {
					text: poster.getText()
				};	
			}
		}
	})
	.state('editor.slide.tools.font',
	{
		url : "/font",
		templateUrl : "views/partials/poster/editor/slide/tools/font.html",
		controller : function($scope)
		{
			$scope.fonts = [
				{name:'arial', label:'Arial'},
				{name:'times', label:'Times New Roman'}
			];
			
			// selezione
			$scope.font = $scope.fonts[0];
		}
	})
	.state('editor.slide.tools.color',
	{
		url : "/color",
		templateUrl : "views/partials/poster/editor/slide/tools/color.html",
		controller : function($scope,poster,resolvedData)
		{
			// recupero lo stato
			$scope.slideFore = resolvedData.slideFore;
			$scope.slideBack = resolvedData.slideBack;
			$scope.docFore = resolvedData.docFore;
			$scope.docBack = resolvedData.docBack;

			// osservo i cambiamenti
			$scope.$watch(
				"slideFore",
				function(newvalue,oldvalue)
				{
					poster.setColor('slideFore',newvalue);
				}
			);
			$scope.$watch(
				"slideBack",
				function(newvalue,oldvalue)
				{
					poster.setColor('slideBack',newvalue);
				}
			);
			$scope.$watch(
				"docFore",
				function(newvalue,oldvalue)
				{
					poster.setColor('docFore',newvalue);
				}
			);
			$scope.$watch(
				"docBack",
				function(newvalue,oldvalue)
				{
					poster.setColor('docBack',newvalue);
				}
			);
		},
		resolve:
		{
			resolvedData: function(poster)
			{
				return {
					slideFore: poster.getColor('slideFore'),
					slideBack: poster.getColor('slideBack'),
					docFore: poster.getColor('docFore'),
					docBack: poster.getColor('docBack')
				};	
			}
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