angular.module('WeatherApp')
	.directive('resortCard', resortCard);

function resortCard(){
	var directive = {
		restrict : 'E',
		replace : true,
		templateUrl : 'templates/resortDirective.html',
		scope: {
			question: "@"
		}
	};
	return directive;
}