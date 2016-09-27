(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }


  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var itemsToBuy = [
      { name: "cookies", quantity: 10 },
      { name: "chips", quantity: 7 },
      { name: "water", quantity: 1 },
      { name: "crackers", quantity: 34 },
      { name: "apples", quantity: 5 }
    ];

    var itemsBought = [];

    service.buyItem = function (itemIdex) {
      itemsBought.push(
        itemsToBuy.splice(itemIdex, 1)
      );
      console.log(itemsBought)
    };

    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    service.getBoughtItems = function () {
      return itemsBought;
    };
  }

})();
