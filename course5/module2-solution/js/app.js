(function () {

  'use strict';

  // setup module, service and controllers
  angular.module('ShoppingListCheckOff', [])
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController);

  // controller to handle list of items to buy
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    // initialize shopping list
    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

    // mark items at itenIndex bought
    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  // controller to handle list of bought items
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    // initialize list of bought items
    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  // service to handle shopping list of items to buy and items already bought
  function ShoppingListCheckOffService() {
    var service = this;

    // sample list of items to buy
    var itemsToBuy = [
      { name: "cookies", quantity: 10 },
      { name: "chips", quantity: 7 },
      { name: "water", quantity: 1 },
      { name: "crackers", quantity: 34 },
      { name: "apples", quantity: 5 }
    ];

    // initialize array of items we've 'bought'
    var itemsBought = [];

    // move item from toBuy to 'bought' list
    service.buyItem = function (itemIndex) {
      itemsBought.push(
        itemsToBuy.splice(itemIndex, 1)[0]
      );
    };

    // get list of items to buy
    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    // get list of items already bought
    service.getBoughtItems = function () {
      return itemsBought;
    };
  }

})();
