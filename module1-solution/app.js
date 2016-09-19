(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', MsgController);

  MsgController.$inject = ['$scope'];
  function MsgController($scope) {
    $scope.lunchItems = "";

    $scope.checkLunch = function () {

      var num_items = countItems();

      if (num_items == 0) {
        $scope.lunchMessage = "Please enter data first";
      }
    };

    // Utility function to sanitize input and count items
    function countItems () {
      var num_items = 0;

      return 0;
    }
  }
})();
