(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', MsgController);

  MsgController.$inject = ['$scope'];
  function MsgController($scope) {
    // initialize part of the model
    $scope.lunchItems = "";
    $scope.inputStyle = {'border-color': 'red'};
    $scope.messageStyle = {'color': 'red'};

    // initial handler for the check button
    $scope.checkLunch = function () {
      // validate, count input
      var num_items = countItems();

      // Output according to the validated/sanitized input
      if (num_items == 0) {
        colorMe("red");
        $scope.lunchMessage = "Please enter data first";
      }
      else if (num_items <= 3) {
        colorMe("green");
        $scope.lunchMessage = "Enjoy!";
      }
      else if (num_items > 3) {
        colorMe("green");
        $scope.lunchMessage = "Too much!";
      } else {
        console.log("This should never happen!")
      }
    };

    // Utility function to sanitize input and count items
    function countItems () {
      var num_items = 0;

      if ($scope.lunchItems.length > 0) {
        var items = $scope.lunchItems.split(",");

        // remove empty items from the list
        // do NOT consider and empty item, i.e. ", , ," as an item towards the count
        items = items.filter(function (item) {
          return item.trim() != "";
        });

        num_items = items.length;
      }

      return num_items;
    }

    // colouring functions
    function colorMe(color) {
      switch (color) {
        case "green":
          $scope.inputStyle = {'border-color': 'green'};
          $scope.messageStyle = {'color': 'green'};
          break;
        case "red":
          $scope.inputStyle = {'border-color': 'red'};
          $scope.messageStyle = {'color': 'red'};
          break;
      }
    }
  }
})();
