class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  decreaseQuality(item, decreaseRythm) {
    if(item.quality > 0) {
      item.quality = item.quality - decreaseRythm;
    };
  };

  increaseQuality(item, increaseRythm) {
    if(item.quality < 50) {
      item.quality = item.quality + increaseRythm;
    };
  };

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      switch (item.name) {
        case 'Aged Brie':
          item.sellIn = item.sellIn - 1;
          this.increaseQuality(item, 1)
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          if(item.sellIn <= 10) {
            this.increaseQuality(item, 2);
            item.sellIn = item.sellIn - 1;
          } else if (item.sellIn <= 5) {
            this.increaseQuality(item, 3);
            item.sellIn = item.sellIn - 1;
          } else if (item.sellIn === 0) {
            item.quality = 0;
          } else {
            this.increaseQuality(item, 1);
            item.sellIn = item.sellIn - 1;
          };
          break;
        case 'Sulfuras, Hand of Ragnaros':
          return item
          break;
        default:
          if(item.sellIn < 0) {
            this.decreaseQuality(item, 2);
          } else {
            this.decreaseQuality(item, 1);
            item.sellIn = item.sellIn - 1;
          };
      }
    }
    return this.items;
  }
};

module.exports = {
  Item,
  Shop
}
