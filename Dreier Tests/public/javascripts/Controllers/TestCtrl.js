angular.module('dreier', [])
    .controller('TestCtrl', ['$scope', function($scope) {
      $scope.text = {
        text: 'guest',
        word: /^\s*\w*\s*$/
      };
    }]);
