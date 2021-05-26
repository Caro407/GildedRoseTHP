var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 2 la qualité d'items normaux dont le sellIn est dépassé", function () {
    listItems.push(new Item("+5 Dexterity Vest", 0, 20));
    listItems.push(new Item("Mana Cake", 0, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 0, quality: 18 },
      { sellIn: 0, quality: 4 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter de 1 la qualité de Aged Brie", function () {
    listItems.push(new Item("Aged Brie", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Un item ne peut descendre en-dessous de 0 de qualité", function () {
    listItems.push(new Item("Jumanji the Board Game", 20, 0));
    listItems.push(new Item("Magical Jacket", 0, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 0 },
      { sellIn: 0, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Un item autre que Sulfuras ne peut pas aller au-delà de 50 de qualité", function () {
    listItems.push(new Item("Aged Brie", 20, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50));
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 10, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 50 },
      { sellIn: 9, quality: 50 },
      { sellIn: 9, quality: 80 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter de 1 la qualité d'un Backstage pass dont le sellIn est dans plus de 10 jours", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Passer à 0 la qualité d'un Backstage pass dont le sellIn est dépassé", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", -5, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 0, quality: 0 },
      { sellIn: -5, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter de 2 la qualité d'un Backstage pass dont le sellIn est de 10 jours ou moins", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 7, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 22 },
      { sellIn: 6, quality: 8 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter de 3 la qualité d'un Backstage pass dont le sellIn est de 5 jours ou moins", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 2, 20));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 1, quality: 23 },
      { sellIn: 4, quality: 9 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Ne pas modifier la qualité de Sulfuras", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 10, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 80 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter de 2 la qualité d'un item Conjured", function () {
    listItems.push(new Item("Magical Jacket", 10, 6));
    listItems.push(new Item("Conjured Magical Jacket", 10, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 5 },
      { sellIn: 9, quality: 8 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

});
