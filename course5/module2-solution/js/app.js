(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    list.items = ShoppingListCheckOffService.getItems();

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function () {
      try {
        ShoppingListCheckOffService.addItem(list.itemName, list.itemQuantity);
      } catch (error) {
        list.errorMessage = error.message;
      }
    };

    list.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
    };
  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var toBuy = this;

    list.items = ShoppingListCheckOffService.getItems();

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function () {
      try {
        ShoppingListCheckOffService.addItem(list.itemName, list.itemQuantity);
      } catch (error) {
        list.errorMessage = error.message;
      }
    };

    list.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
    };
  }


// If not specified, maxItems assumed unlimited
  function ShoppingListCheckOffService(maxItems) {
    var service = this;

    // List of shopping items
    var items = [];

    service.addItem = function (itemName, quantity) {
      if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
        var item = {
          name: itemName,
          quantity: quantity
        };
        items.push(item);
      }
      else {
        throw new Error("Max items (" + maxItems + ") reached.");
      }
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

    service.getItems = function () {
      return items;
    };
  }

})();
