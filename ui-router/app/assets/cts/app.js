'use strict';

var app = angular.module('app', ['ngAnimate','ui.router']);

angular.module('app')
.controller('poster', function ($scope) {
 	
});

// ma i servizi non sono che dei facade? mmh...
app.factory('poster', function() {
	var services;
	var activeSlide = {id:0};
	var slides = [];
	
	// init slides
	slides[0] = {
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
	};

	services = {

		// active slide
		setActiveSlide: function(id)
		{
			// segno la slide attiva
			activeSlide = id;

			// se non esiste la creo
			if(typeof slides[activeSlide.id] == 'undefined')
			{

				// creo la nuova slide
				slides[activeSlide.id] = {
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
				};
				
			}
			
		},
		getActiveSlide: function()
		{
			return activeSlide;
		},
		
		// text
		setText: function(text)
		{
			slides[activeSlide.id].text = text;
		},
		getText: function()
		{
			return slides[activeSlide.id].text;
		},
		
		// color
		setColor: function(param,color)
		{
			slides[activeSlide.id].color[param] = color;
		},
		getColor: function(param)
		{
			return slides[activeSlide.id].color[param];
		},
		
		// font
		setFont: function(font)
		{
			slides[activeSlide.id].font = font;
		},
		getFont: function()
		{
			return slides[activeSlide.id].font;
		}

	};

	return services;
}); 




app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/poster");

	// EDITOR
	$stateProvider
	.state('archive',
	{
		url: '/archive',
		templateUrl: 'views/partials/archive.html',
		controller: function($scope)
		{
			console.log('archive');
		}
	})
	.state('poster',
	{
		url: '/poster',
		templateUrl: 'views/partials/poster.html',
		controller: function($scope)
		{
			console.log('poster');
		}
	})
	.state('poster.slide',
	{
		url : "/slide",
		templateUrl : "views/partials/poster/slide.html",
		controller: function($scope)
		{

		}
	})
	.state('poster.slide.editor',
	{
		url : "/editor",
		templateUrl : "views/partials/poster/slide/editor.html",
		controller: function($scope,$state,poster)
		{
			// quante slides ho?
			$scope.slides = [{id: 0},{id: 1},{id: 2}];

			// la slide corrente
			$scope.slide = poster.getActiveSlide();
			$scope.slide = $scope.slides[0];

			// il cambio di slide è monitorato
			$scope.$watch(
				"slide",
				function(newvalue,oldvalue)
				{
					// prima setto la slide attiva
					poster.setActiveSlide(newvalue);
					
					$state.transitionTo('poster.slide.editor.tools');
				}
			);
			
			$scope.changeSlide = function(slide)
			{
				// setto slide
				$scope.slide = slide;
			}

		}
	})
	.state('poster.slide.editor.tools',
	{
		url : "/tools",
		templateUrl : "views/partials/poster/slide/editor/tools.html",
		controller: function($scope,$state,$rootScope)
		{
			$rootScope.$on('$stateChangeSuccess', function()
			{
				$scope.tools = $scope.tools || 'tool-close';
			});
		}
	})
	.state('poster.slide.editor.tools.text',
	{
		url : "/text",
		templateUrl : "views/partials/poster/slide/editor/tools/text.html",
		controller : function($scope,poster,$rootScope,resolvedData)
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
			
			$rootScope.$on('$stateChangeSuccess', function()
			{
				$scope.tools = 'tool-open';
			});
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
	.state('poster.slide.editor.tools.font',
	{
		url : "/font",
		templateUrl : "views/partials/poster/slide/editor/tools/font.html",
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
	.state('poster.slide.editor.tools.color',
	{
		url : "/color",
		templateUrl : "views/partials/poster/slide/editor/tools/color.html",
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
	.state('poster.slide.editor.tools.image',
	{
		url : "/image",
		templateUrl : "views/partials/poster/slide/editor/tools/image.html",
		controller : function($scope) {
			
		}
	})
	.state('poster.slide.editor.tools.wand',
	{
		url : "/wand",
		templateUrl : "views/partials/poster/slide/editor/tools/wand.html",
		controller : function($scope) {
			
		}
	});

});