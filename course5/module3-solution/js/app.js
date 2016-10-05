(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective() {
    return {
      scope: {
        found: '<',
        onRemove: '&',
        searchTerm: '<'
      },
      controller: NarrowItDownController,
      controllerAs: 'narrow',
      bindToController: true,
      templateUrl: 'templates/founditems.html',
      transclude: true
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;

    // define defaults
    narrow.searchTerm = "";
    narrow.found = null;
    narrow.nothingFound = false;

    narrow.narrowDown = function () {
      if (narrow.searchTerm.length > 0) {
        var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

        promise.then(function (response) {
          narrow.found = response;
        });

        promise.catch(function (error) {
          console.log("Something went terribly wrong.", error);
        });
      }
      else {
        narrow.found = [];
      }
    };

    narrow.removeItem = function (itemIndex) {
      narrow.found.splice(itemIndex, 1);
    };
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
