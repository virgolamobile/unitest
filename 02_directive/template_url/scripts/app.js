'use strict';

var app = angular.module('app', []);

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

angular.module('app')
.controller('appController', function ($scope) {

});