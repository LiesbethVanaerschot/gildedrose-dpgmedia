import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('should not be Sulfuras, Hand of Ragnaros', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 3, 1)]);
    const items = gildedRose.updateQuality();
  
    expect(items[0].name).not.toBe('Sulfuras, Hand of Ragnaros');
  });

  it('should be Aged Brie or Backstage passes to a TAFKAL80ETC concert', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 3, 1)]);
    const items = gildedRose.updateQuality();
  
    expect(items[0].name).toBe('Aged Brie');
  });

  it('should have a quality smaller then 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 3, 1)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBeLessThan(50);
  });

  it('should be Backstage passes to a TAFKAL80ETC concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 2)]);
    const items = gildedRose.updateQuality();
  
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
  });

  it('expects the sell in date to be bigger then 5 but smaller then 11', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 2)]);
    const items = gildedRose.updateQuality();
  
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBeGreaterThan(5);
    expect(items[0].sellIn).toBeLessThan(11);
  });

  it('expects the sell in date to be smaller then 6', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 5)]);
    const items = gildedRose.updateQuality();
  
    expect(items[0].sellIn).toBeLessThan(6);
  });

  it('should not be backstage passes or aged brie but Elixir of the Mongoose', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 2, 2)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe('Elixir of the Mongoose');
  });
});
