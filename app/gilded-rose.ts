export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  //standard values
  decreaseSellInVal = 1;
  increaseQVal = 1;
  decreaseQVal = 1;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  decreaseQuality(quality: number, decrement: number) {
    return Math.max(0, quality - decrement);
  };

  increaseQuality(quality: number, increment: number) {
    return Math.min(50, quality + increment);
  };
    

  //type Item can geëxtend worden naar alle varianten van producttypes
  //elk producttype kan dan zo ook een aparte 'updateQ' functie hebben
  updateQuality() {
    this.items = this.items.map((item) => {
      switch(item.name) {
        case 'Sulfuras, Hand of Ragnaros':
          return item;
        case 'Aged Brie':
          item.sellIn = item.sellIn - this.decreaseSellInVal;
          item.quality = this.increaseQuality(item.quality, this.increaseQVal);
          return item;
        case 'Backstage passes to a TAFKAL80ETC concert':
          item.sellIn = item.sellIn - this.decreaseSellInVal;
          if (item.sellIn <= 0) {
            item.quality = 0;
            return item;
          }
          this.increaseQVal = item.sellIn <= 5 ? 3 : item.sellIn <= 10 ? 2 : 1;
          item.quality = this.increaseQuality(item.quality, this.increaseQVal);
          return item;
        case 'Conjured Mana Cake':
          item.sellIn = item.sellIn - this.decreaseSellInVal;
          this.decreaseQVal = item.sellIn < 0 ? 4 : 2;
          item.quality = this.decreaseQuality(item.quality, this.decreaseQVal);
          return item;
        default:
          item.sellIn = item.sellIn - this.decreaseSellInVal;
          this.decreaseQVal = item.sellIn < 0 ? 2 : 1;
          item.quality = this.decreaseQuality(item.quality, this.decreaseQVal);
          return item;
      }
    });

    return this.items;
  }
}
