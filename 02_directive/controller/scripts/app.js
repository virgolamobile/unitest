'use strict';

var app = angular.module('app', []);

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

angular.module('app')
.controller('appController', function ($scope) {

});