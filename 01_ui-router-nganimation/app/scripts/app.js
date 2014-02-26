'use strict';

var app = angular.module('app', ['ngAnimate']);

angular.module('app')
.controller('appController', function ($scope) {
	
	$scope.list = [{name:'uno'},{name:'due'},{name:'tre'}];
	
	$scope.addElement = function()
	{
		$scope.list.push({name:'element ' + $scope.list.length});
	}
});