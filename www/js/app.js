// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('icebreaker', ['ionic', 'openfb']);

app.run(function($ionicPlatform, $rootScope, Database, Events, $window, $state, $http) {
  $ionicPlatform.ready(function() {

    $rootScope.initialDatabaseCall = false;
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  
    // this checks at every screen change whether the user is logged in
    // and kicks off the signin process if not logged in

  // $rootScope.$on('$stateChangeStart', function(event, toState) {
  //   if (!$rootScope.initialDatabaseCall && $window.localStorage.getItem('jwtToken')) {
  //     // move database call here
  //     $rootScope.initialDatabaseCall = true;
  //     event.preventDefault();
  //   }
  // });
  $rootScope.potentialMatches = [];
  $http({
      method: 'get',
      url: 'http://zavadil7.cloudapp.net/allcandidates/?apiKey=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiJ6b3VuZHNfcGVla2luZyJ9.U-2sjzUTITlXuetMgYJJFEQ6LJQ-5mx1dLwUa6xQfFI&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmYl9pZCI6IjEwMTUyMTE2NjkwMTgyMzk2In0.t3Qr-j6cyA5fW2mnjjHO_RDmCi6TcQtw7NW1K42aKJ8'
    }).success(function(data){
      for(var i = 0; i < 21; i++) {
        // data[i]['img'] = ''
        $rootScope.potentialMatches.push(data[i]);
      }
    }).error(function(err){
      console.log(err);
  });

  $rootScope.currentUser = {};
  $rootScope.currentUser.id = 0;
  $rootScope.currentEvent = {};
  Events.getEvents().then(function(results) {
    $rootScope.potentialEvents = results.data.events;
//    console.log($rootScope.potentialEvents)
  });

  Database.matches($rootScope.currentUser.id).success(function(data) {
    $rootScope.matches = {};
    for (var i = 0; i < data.results.length; i++) {
      var match = data.results[i];
      $rootScope.matches[match.id] = match;
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/sign-in");

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })

    .state('events', {
      url: '/events',
      templateUrl: 'templates/events.html',
      controller: 'EventsCtrl'
    })

    .state('matches', {
      url: '/matches',
      templateUrl: 'templates/matches.html',
      controller: 'MatchesCtrl'
    })

    .state('potentialEvents', {
      url: '/potentialEvents',
      templateUrl: "templates/potentialEvents.html",
      controller: 'PotentialEventsCtrl'
    })

    .state('potentialMatches', {
      url: '/potentialMatches',
      templateUrl: 'templates/potentialMatches.html',
      controller: 'PotentialMatchesCtrl'
    })

    .state('specificMatch', {
      url: '/specificMatch/:id',
      templateUrl: 'templates/specificMatch.html',
      controller: 'SpecificMatchCtrl'
    })

    .state('specificEvent', {
      url: '/specificEvent',
      templateUrl: 'templates/specificEvent.html',
      controller: 'SpecificEventCtrl'
    });
  });
