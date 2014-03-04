'use strict';

var app = angular.module('app', []);

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


// LINK for instance DOM manipulation
app.directive('immagine', function() {
	return {
		// link prende 3 argomenti:
		// - scope usato dalla direttiva
		// - element in cui la direttiva è chiamata
		// - attrs associati all'elemento
		link: function($scope, element, attrs)
		{
			// creo un nodo immagine
			var img = document.createElement('img');
			img.src = attrs.href; // href diventa img src
			
			// il testo diventa il title
			img.setAttribute('alt',element[0].textContent);
			element[0].textContent = null;

			// appendo l'elemento
			element[0].appendChild(img);
		}
	}
});

// COMPILE for template DOM manipulation
app.directive('ntimes', function() {
	return {
		restrict : 'E',
		compile: function(tElement, attrs) {
			
			var elemento = tElement.children();
			
			for(var i=0;i<attrs.repeat - 1; i++)
			{
				// clono l'elemento base
				var nuovo_elemento = elemento.clone();
				nuovo_elemento[0].textContent = i;

				// aggiungo il nuovo figlio				
				tElement.append(nuovo_elemento);
			}
			
			// rimuovo l'elemento iniziale
			elemento.remove();

			// sostituisco l'elemento coi suoi figli
			tElement.replaceWith(tElement.children());

		}
	}
});

// Restrict E (element) <avatar>
app.directive('avatar', function($http) {
	return {
		restrict : 'E', // sostituisco l'elemento con il template
		replace: true,
		template: '<img src="{{data.avatar_url}}" style="width:100px;" />',
		link: function($scope, element, attrs)
		{
			var user = attrs.user;
			
			$http.get('https://api.github.com/users/' + user).success(function(data) {
				$scope.data = data;
			});
		}
	}
});

// Restrict A (attribute) <div avatar>
app.directive('avatar2', function($http) {
	return {
		restrict : 'A',
		template: '<img src="{{data2.avatar_url}}" style="width:100px;" />',
		link: function($scope, element, attrs)
		{
			var user = attrs.avatar2;
			
			$http.get('https://api.github.com/users/' + user).success(function(data) {
				$scope.data2 = data;
			});
		}
	}
});

// templateUrl
app.directive('usatemplate', function() {
	return {
		restrict : 'A',
		templateUrl: 'template.html',
		link: function($scope, element, attrs)
		{
			$scope.title = 'Titolo';
			$scope.text = 'Lorem ipsum dolor sit amet.';
		}
	}
});

// priority
app.directive('btn',function(){
	return {
		priority: 2,
		link: function($scope,element,attrs)
		{
			element.addClass('btn');
		}
	}
});
// priority
app.directive('checkbtn',function(){
	return {
		priority: 1,
		link: function($scope,element,attrs)
		{
			if(element.hasClass('btn'))
			{
				element.addClass('btn-ok');	
			}
			else
			{
				element.addClass('btn-no');
			}
		}
	}
});

// controller in directive
app.directive('stato',function(){
	return {
		restrict: 'E',
		link: function($scope,element,attrs)
		{
			$scope.status = 'on';
		},
		controller: function($scope)
		{
			$scope.toggle = function()
			{
				$scope.status = $scope.status == 'on' ? 'off' : 'on';
			}			
		}
	}
});

// controller in directive
app.directive('powerswitch',function(){
	return {
		restrict: 'E',
		link: function($scope,element,attrs)
		{
			$scope.powerstatus = 'off';
		},
		controller: function($scope)
		{
			$scope.togglepower = function()
			{
				$scope.powerstatus = $scope.powerstatus == 'on' ? 'off' : 'on';
			}
			
			this.getPowerstatus = function() {
        		return $scope.powerstatus;
      		};
		}
	}
});

// controller in directive
app.directive('lightbulb',function(){
	return {
		restrict: 'E',
		require: '^powerswitch',
		link: function($scope,element,attrs,controller)
		{
			$scope.$watch(function(){
				$scope.bulb = controller.getPowerstatus();	
			});
		}
	}
});


app.directive('whoiam', function($http) {
	return {
		restrict : 'E',
		transclude : true,
		templateUrl : 'marquee.html',
		link : function($scope, element, attrs) {
			$scope.name = 'Niccolo';
		}
	};
}); 





angular.module('app')
.controller('appController', function ($scope) {
	
	$scope.hello = 'Hello World!';
	
});