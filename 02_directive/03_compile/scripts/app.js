'use strict';

var app = angular.module('app', []);

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


angular.module('app')
.controller('appController', function ($scope) {
	
});