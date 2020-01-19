var Item = (function() {
  var nextId = 1;

  return function(name, price, calories) {
    this.id = nextId++;
    this.name = name;
    this.price = price;
    this.calories = calories;
  };
})();

Item.prototype.getPrice = function() {
  return this.price;
};

Item.prototype.getCalories = function() {
  return this.calories;
};

function Hamburger(size, stuffings) {
  Item.call(this, Hamburger.name);
  this.size = size;
  this.stuffings = stuffings;
  this.calories = this.calculateCalories();
  this.price = this.calculatePrice();
}

Hamburger.prototype = Object.create(Item.prototype);
Hamburger.prototype.constructor = Hamburger;

Hamburger.SIZE_SMALL = {
  name: 'small',
  price: 50,
  calories: 20
};
Hamburger.SIZE_LARGE = {
  name: 'large',
  price: 100,
  calories: 40
};
Hamburger.STUFFING_CHEESE = {
  name: 'cheese',
  price: 10,
  calories: 20
};
Hamburger.STUFFING_SALAD = {
  name: 'salad',
  price: 20,
  calories: 5
};
Hamburger.STUFFING_POTATO = {
  name: 'potato',
  price: 15,
  calories: 10
};

Hamburger.prototype.calculatePrice = function() {
  var stuffingsCost = this.stuffings.reduce(function(a, obj) {
    return a + obj.price;
  }, 0);

  return this.size.price + stuffingsCost;
};

Hamburger.prototype.calculateCalories = function() {
  var stuffingsCalories = this.stuffings.reduce(function(a, obj) {
    return a + obj.calories;
  }, 0);

  return this.size.calories + stuffingsCalories;
};

function Drink(drink) {
  Item.call(this, drink.name, drink.price, drink.calories);
}

Drink.prototype = Object.create(Item.prototype);
Drink.prototype.constructor = Drink;

Drink.COLA = {
  name: 'Cola',
  price: 50,
  calories: 40
};
Drink.COFFEE = {
  name: 'Coffee',
  price: 80,
  calories: 20
};

function Salad(salad, weight) {
  Item.call(this, salad.name);
  this.weight = weight || 100;
  this.calories = this.getCalories(salad.calories);
  this.price = this.getPrice(salad.price);
}

Salad.prototype = Object.create(Item.prototype);
Salad.prototype.constructor = Salad;

Salad.CAESAR = {
  name: 'Caesar',
  price: 100,
  calories: 20
};
Salad.OLIVIE = {
  name: 'Olivie',
  price: 50,
  calories: 80
};

Salad.prototype.getCalories = function(calories) {
  return (calories * this.weight) / 100;
};

Salad.prototype.getPrice = function(price) {
  return (price * this.weight) / 100;
};

function Order() {
  this.items = [].slice.call(arguments);
  isPaid = false;
}

Order.prototype.constructor = Order;

Order.prototype.addItem = function(item) {
  if (!this.isPaid) {
    var newItem = {
      ...item,
      id: this.items.length > 0 ? this.items[this.items.length - 1].id + 1 : 1
    };

    this.items.push(newItem);
    return 'You just added ' + item.name + ' to your order!';
  } else {
    return 'This order has already been paid!';
  }
};

Order.prototype.getItems = function() {
  return this.items;
};

Order.prototype.deleteItem = function(item) {
  if (!this.isPaid) {
    if (this.items.indexOf(item) !== -1) {
      var id = item.id;

      this.items = this.items.filter(function(item) {
        return item.id !== id;
      });
      return 'You just deleted ' + item.name + ' from your order!';
    } else return "Oops! Couldn't find this item!";
  } else return 'This order has already been paid!';
};

Order.prototype.payForOrder = function() {
  if (!this.isPaid) {
    this.isPaid = true;
    return 'Thanks for your order!';
  }
  return 'This order has already been paid!';
};

Order.prototype.calculatePrice = function() {
  var sum = this.items.reduce(function(acc, item) {
    return acc + item.price;
  }, 0);

  return sum;
};

Order.prototype.calculateCalories = function() {
  var sum = this.items.reduce(function(acc, item) {
    return acc + item.calories;
  }, 0);

  return sum;
};

let h = new Hamburger(Hamburger.SIZE_SMALL, [
  Hamburger.STUFFING_SALAD,
  Hamburger.STUFFING_CHEESE
]);
let d = new Drink(Drink.COFFEE);
let s = new Salad(Salad.CAESAR, 100);
order = new Order(h, d, s);

console.log('Order data: ');
console.log(order.getItems());
console.log('Total cost: ' + order.calculatePrice());
console.log(order.deleteItem(h));
console.log(order.addItem(s));
console.log('New order data: ');
console.log(order.getItems());
console.log('Total cost: ' + order.calculatePrice());
console.log(order.payForOrder());
console.log(order.addItem(h));
