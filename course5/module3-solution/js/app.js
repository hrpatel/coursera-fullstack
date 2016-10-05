(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
    // .component('shoppingList', {
    //   templateUrl: 'shoppingList.html',
    //   controller: ShoppingListComponentController,
    //   bindings: {
    //     items: '<',
    //     myTitle: '@title',
    //     onRemove: '&'
    //   }
    // });
  ;

  // ShoppingListComponentController.$inject = ['$scope', '$element']
  // function ShoppingListComponentController($scope, $element) {
  //   var $ctrl = this;
  //
  //   $ctrl.cookiesInList = function () {
  //     for (var i = 0; i < $ctrl.items.length; i++) {
  //       var name = $ctrl.items[i].name;
  //       if (name.toLowerCase().indexOf("cookie") !== -1) {
  //         return true;
  //       }
  //     }
  //
  //     return false;
  //   };
  //
  //   $ctrl.remove = function (myIndex) {
  //     $ctrl.onRemove({ index: myIndex });
  //   };
  //
  //   $ctrl.$onInit = function () {
  //     console.log("We are in $onInit()");
  //   };
  //
  //   $ctrl.$onChanges = function (changeObj) {
  //     console.log("Changes: ", changeObj);
  //   }
  //
  //   $ctrl.$postLink = function () {
  //     $scope.$watch('$ctrl.cookiesInList()', function (newValue, oldValue) {
  //       console.log($element);
  //       if (newValue === true) {
  //         // Show warning
  //         var warningElem = $element.find('div.error');
  //         warningElem.slideDown(900);
  //       }
  //       else {
  //         // Hide warning
  //         var warningElem = $element.find('div.error');
  //         warningElem.slideUp(900);
  //       }
  //     });
  //   };
  // }


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;

    // define defaults
    narrow.searchTerm = "broth";
    narrow.foundItems = [];

    narrow.narrowDown = function () {
      var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

      promise.then(function (response) {
        narrow.foundItems = response;
      });

      promise.catch(function (error) {
        console.log("Something went terribly wrong.", error);
      });
    }
  }


  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {

      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      })
        .then(
          function (response) {
            var foundItems = [];
            var allItems = response.data['menu_items'];

            for (var i = 0; i < allItems.length; i++) {
              if (allItems[i]['description'].includes(searchTerm)) {
                foundItems.push(allItems[i])
              }
            }

            return foundItems;
          });
    };
  }

})();
