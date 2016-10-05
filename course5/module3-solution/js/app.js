(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
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
      templateUrl: '../templates/founditems.html',
      transclude: true
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;

    // define defaults
    narrow.searchTerm = "";
    narrow.found = [];
    narrow.nothingFound = false;

    narrow.narrowDown = function () {
      narrow.found = [];


      if (narrow.searchTerm.length > 0 && narrow.previousSearchTerm != narrow.searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

        promise.then(function (response) {
          narrow.found = response;

          if (narrow.found.length > 0) {
            narrow.nothingFound = false;
            narrow.previousSearchTerm = narrow.searchTerm;
          }
        });

        promise.catch(function (error) {
          console.log("Something went terribly wrong.", error);
        });
      }
      else {
        narrow.nothingFound = true;
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
              if (allItems[i]['description'].includes(searchTerm.trim())) {
                foundItems.push(allItems[i])
              }
            }

            return foundItems;
          });
    };
  }

})();
