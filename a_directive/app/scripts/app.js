'use strict';

var app = angular.module('app', []);

// poster
app.factory('poster', function(){
	
	var poster = {}
	

	return {
		setText : function(text) {
			poster.text = text;
		},
		getText : function() {
			return poster.text;
		},
		getAll : function() {
			return poster;
		}
	}

});

// slide
app.directive('slide', ['poster', function(poster) {
	return {
		restrict: 'E',
		templateUrl: 'slide',
		controller: function($scope)
		{
			$scope.poster = poster.getAll();
		}
	}
}]);

// text
app.directive('text', ['poster', function(poster) {
	return {
		restrict: 'E',
		templateUrl: 'tool.text',
		controller: function($scope)
		{
			$scope.setText = function()
			{
				poster.setText($scope.text);
			};
		}
	}
}]);

angular.module('app')
.controller('appController', function ($scope) {

});