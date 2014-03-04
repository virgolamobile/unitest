'use strict';

var app = angular.module('app', []);

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

angular.module('app')
.controller('appController', function ($scope) {

});