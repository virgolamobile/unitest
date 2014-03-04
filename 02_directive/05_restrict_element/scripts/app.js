'use strict';

var app = angular.module('app', []);

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

angular.module('app')
.controller('appController', function ($scope) {

});