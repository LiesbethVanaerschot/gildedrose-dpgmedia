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

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  decreaseQuality(quality: any, decrement: any) {
    return Math.max(0, quality - decrement);
  };

  increaseQuality(quality: any, increment: any) {
    return Math.min(50, quality + increment);
  };
    

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      //first exception Sulfuras is a stable product
      if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
        //normal case: per update sellIn -1
        this.items[i].sellIn = this.items[i].sellIn - 1;

        //If-else statement that separates the ones that decrease from the ones that increase in quality.
        if ( this.items[i].name === 'Aged Brie' || this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
          //standard + 1 in quality
          this.items[i].quality = this.increaseQuality(this.items[i].quality, 1);
          //but backstage passes have two extra levels till the event has passed
          if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn > 5 && this.items[i].sellIn < 11) {
              this.items[i].quality = this.increaseQuality(this.items[i].quality, 1);
            } else if (this.items[i].sellIn >= 0 && this.items[i].sellIn < 6) {
              this.items[i].quality = this.increaseQuality(this.items[i].quality, 2);
            } else if (this.items[i].sellIn < 0) {
              this.items[i].quality = 0;
            }
          }
        } else {
          //Conjured cake degrade twice as fast as the rest, Quality is never negative
          if (this.items[i].sellIn > 0) {
            this.items[i].quality = this.items[i].name !== 'Conjured Mana Cake' ? this.decreaseQuality(this.items[i].quality, 1) : this.decreaseQuality(this.items[i].quality, 2);
          } else {
            this.items[i].quality = this.items[i].name !== 'Conjured Mana Cake' ? this.decreaseQuality(this.items[i].quality, 2) : this.decreaseQuality(this.items[i].quality, 4);
          }
        }
      }
    }

    return this.items;
  }
}
