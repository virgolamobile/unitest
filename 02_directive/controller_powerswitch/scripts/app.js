'use strict';

var app = angular.module('app', []);

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

angular.module('app')
.controller('appController', function ($scope) {

});