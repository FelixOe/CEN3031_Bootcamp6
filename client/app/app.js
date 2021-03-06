/* register the modules the application depends upon here*/
angular.module('listings', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps', 'listings']);

/* application configuration */
app.config(['$urlRouterProvider', '$locationProvider',
  function($urlRouterProvider, $locationProvider, GoogleMapApi) {
    /* https://docs.angularjs.org/api/ng/provider/$locationProvider */
    $locationProvider.html5Mode(true);

    /* go to the '/listings' URL if an invalid route is provided */
    $urlRouterProvider.otherwise('/listings');

    // GoogleMapApi.configure({
    //     key: 'AIzaSyDRi_pE78hIn4wwXpK0FTC19phDEauyDe4',
    //     v: '3.17',
    //     libraries: 'weather, geometry, visualization'
    // });
  }
]);

/* set the initial state of the application */
app.run(['$state', 
  function($state) {
    $state.go('listings.list');
  }
]);