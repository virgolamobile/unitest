'use strict';

var app = angular.module('app', []);

// priority
app.directive('btn',function(){
	return {
		priority: 0,
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

angular.module('app')
.controller('appController', function ($scope) {

});