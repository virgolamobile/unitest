'use strict';

var app = angular.module('app', ['ngAnimate','ui.router']);


app.directive('resizable', function($window) {
	return function($scope) {
		$scope.initializeWindowSize = function() {
			$scope.windowHeight = $window.innerHeight;
			return $scope.windowWidth = $window.innerWidth;
		};
		$scope.initializeWindowSize();
		return angular.element($window).bind('resize', function() {
			$scope.initializeWindowSize();
			return $scope.$apply();
		});
	};
});


angular.module('app')
.controller('doc', function ($scope,poster,$window) {
	// ottengo le slides
	$scope.slides = poster.getSlides();
	$scope.activeSlide = poster.getActiveSlide();

});

// ma i servizi non sono che dei facade? mmh...
app.factory('poster', function() {
	var services;
	var activeSlide = 0;
	var slides = [];

	services = {

		// active slide
		addSlide: function(id)
		{
			// se non passo l'id, creo un nuovo id, l'ultima
			if(typeof id == 'undefined')
			{
				var id = slides.length;
			}
			
			// creo la nuova slide
			slides[id] = {
				id: id,
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
		},
		setActiveSlide: function(id)
		{
			// segno la slide attiva
			activeSlide = id;

			// se non esiste la creo
			if(typeof slides[id] == 'undefined')
			{
				this.addSlide(id);
			}		
		},
		getActiveSlide: function()
		{
			return activeSlide;
		},
		
		// text
		setText: function(text)
		{
			slides[activeSlide].text = text;
		},
		getText: function()
		{
			return slides[activeSlide].text;
		},
		
		// color
		setColor: function(param,color)
		{
			slides[activeSlide].color[param] = color;
		},
		getColor: function(param)
		{
			return slides[activeSlide].color[param];
		},
		
		// font
		setFont: function(font)
		{
			slides[activeSlide].font = font;
		},
		getFont: function()
		{
			return slides[activeSlide].font;
		},
		
		// debug
		getSlides: function()
		{
			return slides;
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

		}
	})
	.state('poster.slide',
	{
		url : "/slide",
		templateUrl : "views/partials/poster/slide.html",
		controller: function($scope,$state,poster)
		{
			// init slides
			poster.setActiveSlide(0);
			
			// il cambio di slide è monitorato
			$scope.$watch(
				"slide",
				function(newSlideId,oldSlideId)
				{
					// se non esiste la creo
					if(typeof newSlideId == 'undefined')
					{
						newSlideId = 0;
					}
					
					// segnalo l'id della slide da considerare attiva
					poster.setActiveSlide(newSlideId);
					$scope.activeSlide = newSlideId;
					
					$state.transitionTo('poster.slide.editor.tools');
				}
			);
			
			// ottengo l'elenco delle slides.
			$scope.slides = poster.getSlides();
			
			// quando cambio slide
			$scope.changeSlide = function(slide)
			{
				// setto slide
				$scope.slide = slide;
			}
			
			// quando aggiungo una slide
			$scope.addSlide = function()
			{
				// aggiungo una slide in coda
				poster.addSlide();
			}

			$scope.currentStyle = {
				color:poster.getColor('slideFore'),
				backgroundColor:poster.getColor('slideBack')
				// backgroundColor:$scope.slides[$scope.activeSlide].slideBack
			};

		}

	})
	.state('poster.slide.editor',
	{
		url : "/editor",
		templateUrl : "views/partials/poster/slide/editor.html",
		controller: function($scope)
		{
			

		}
	})
	.state('poster.slide.editor.tools',
	{
		url : "/tools",
		templateUrl : "views/partials/poster/slide/editor/tools.php",
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