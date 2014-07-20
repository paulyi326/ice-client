app.controller('PotentialMatchesCtrl', function($rootScope, $scope, $state, $ionicPopup, Database, $http) {

  // $scope.init = function() {
  //   Database.potentialMatches().success(function(data) {
  //     $scope.potentialMatches = data.results;
  //     console.log('sdfdsf')
  //   });
  // };

  // $scope.init();

  $scope.matches = function() {
    $state.go('matches');
  };

  $scope.kill = function(index) {
    // this removes the first item from the potentialMatches
    // array. ng-repeat is run again, and everything has a new
    // index. So what had an index of 1 will now have an index of 0, etc.
    // I guess the whole view is re-rendered, instead of just removing
    // one node in the DOM
    $scope.potentialMatches.splice(index, 1);

  };

  $scope.sendMessage = function(message) {
    console.log(message);
  };

  $scope.like = function(index, otherId) {
    console.log(otherId);
    $http({
      method: 'post',
      url: "http://zavadil7.cloudapp.net/matches/?apiKey=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiJ6b3VuZHNfcGVla2luZyJ9.U-2sjzUTITlXuetMgYJJFEQ6LJQ-5mx1dLwUa6xQfFI&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmYl9pZCI6IjEwMTUyMTE2NjkwMTgyMzk2In0.t3Qr-j6cyA5fW2mnjjHO_RDmCi6TcQtw7NW1K42aKJ8&fb_id=" + otherId,
    }).success(function(){
      console.log('sent your match');
    }).error(function(err){
      console.log(err);
    });


    $scope.kill(index);
  };



    // var isMatch = Database.isMatch($rootScope.currentUser.uid, otherId);
    // if (isMatch) {
    //   $scope.data = {};
    //   var matchPopup = $ionicPopup.show({
    //     template: '<input type="text" ng-model="data.message">',
    //     title: 'You have a match!',
    //     subTitle: 'Send them a message!',
    //     scope: $scope,
    //     buttons: [
    //       { 
    //         text: 'Not Now',
    //         onTap: function() {
    //           $scope.kill(index);
    //         }
    //       },
    //       {
    //         text: 'Send',
    //         type: 'button-positive',
    //         onTap: function(e) {
    //           if ($scope.data.message === undefined) {
    //             e.preventDefault();
    //           } else {
    //             $scope.sendMessage($scope.data.message);
    //             $scope.kill(index);
    //           }
    //         }
    //       },
    //     ]
    // });


    // isMatch functionality needs to be put inside .success in http call
    //   } else {
    //     $scope.kill(index);
    //   }
    // };
    



  $scope.dislike = function(index) {
    $scope.kill(index);
    console.log('dislike');
  };

  $scope.info = function() {
    // this should redirect you to a person's profile
    // 
  };

  $scope.sendMessage = function(message) {
    console.log(message);
  };

});