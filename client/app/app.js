/* register the modules the application depends upon here*/
angular.module('listings', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps', 'listings']);

/* application configuration */
app.config(['$urlRouterProvider', '$locationProvider', 'uiGmapgoogle-maps',
  function($urlRouterProvider, $locationProvider, GoogleMapsApiProviders) {
    /* https://docs.angularjs.org/api/ng/provider/$locationProvider */
    $locationProvider.html5Mode(true);

    /* go to the '/listings' URL if an invalid route is provided */
    $urlRouterProvider.otherwise('/listings');

    GoogleMapsApiProviders.configure({ key: 'AIzaSyBrGmd73N_Ve9G7Q5SjpG8AJrOSqgGcHP4'});
  }
]);

/* set the initial state of the application */
app.run(['$state', 
  function($state) {
    $state.go('listings.list');
  }
]);