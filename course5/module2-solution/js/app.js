(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItems();

    toBuy.itemName = "";
    toBuy.itemQuantity = "";

    toBuy.addItem = function () {
      try {
        ShoppingListCheckOffService.addItem(litoBuyst.itemName, toBuy.itemQuantity);
      } catch (error) {
        toBuy.errorMessage = error.message;
      }
    };

    toBuy.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
    };
  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getItems();

    bought.itemName = "";
    bought.itemQuantity = "";

    bought.addItem = function () {
      try {
        ShoppingListCheckOffService.addItem(bought.itemName, bought.itemQuantity);
      } catch (error) {
        list.errorMessage = error.message;
      }
    };

    bought.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
    };
  }


  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var items = [];

    service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    };

    service.removeItem = function (itemIdex) {
      items.splice(itemIdex, 1);
    };

    service.getItems = function () {
      return items;
    };
  }

})();
