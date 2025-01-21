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

  it('expects the sell in date to be smaller then 0, quality becomes 0', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', -1, 5)]);
    const items = gildedRose.updateQuality();
  
    expect(items[0].sellIn).toBeLessThan(0);
    expect(items[0].quality).toEqual(0);
  });

  it('should not be backstage passes or aged brie but Elixir of the Mongoose', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 2, 2)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe('Elixir of the Mongoose');
  });

  it('expects the sell date to be bigger than 0', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 2, 2)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBeGreaterThan(0);
  });

  it('should not to be a conjured item and quality should be decreased with 1', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 2, 2), new Item('Elixir of the Mongoose', 2, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).not.toBe('Conjured Mana Cake');
    expect(items[1].name).not.toBe('Conjured Mana Cake');
    expect(items[0].quality).toEqual(1);
    expect(items[1].quality).toEqual(0);
  });

  it('should be a conjured item and quality should be decreased with 2', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 2, 2), new Item('Conjured Mana Cake', 2, 1)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe('Conjured Mana Cake');
    expect(items[1].name).toBe('Conjured Mana Cake');
    expect(items[0].quality).toEqual(0);
    expect(items[1].quality).toEqual(0);
  });

  it('expects the sell date to be smaller than 0', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', -2, 2)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBeLessThan(0);
  });

  it('should not to be a conjured item and quality should be decreased with 2', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', -1, 2)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).not.toBe('Conjured Mana Cake');
    expect(items[0].quality).toEqual(0);
  });

  it('should be a conjured item and quality should be decreased with 4', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', -2, 5)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe('Conjured Mana Cake');
    expect(items[0].quality).toEqual(1);
  });
});
