'use strict';

var app = angular.module('app', []);

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

angular.module('app')
.controller('appController', function ($scope) {

});