import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  //first function and constructor test: does it work?
  it('works', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 3, 1)]);
    const spy = jest.spyOn(gildedRose, 'updateQuality');
    const items = gildedRose.updateQuality();
    
    expect(typeof gildedRose.items).toBe('object');
    expect(gildedRose.items[0].name).toBe('Aged Brie');
    expect(spy).toHaveBeenCalled();
  });

  describe('update quality', () => {
    //first case: sulfuras
    it('should not change Sulfuras, Hand of Ragnaros data', () => {
      const items = [new Item('Sulfuras, Hand of Ragnaros', 0, 80)];
      const expectedItems = [new Item('Sulfuras, Hand of Ragnaros', 0, 80)];
      const gildedRose = new GildedRose(items);
      let newItems = gildedRose.updateQuality();
    
      expect(newItems).toStrictEqual(expectedItems);
    });

    //second case: aged items
    it('should increase Aged Bries quality', () => {
      const items = [new Item('Aged Brie', 3, 1)];
      const expectedItems = [new Item('Aged Brie', 2, 2)];
      const gildedRose = new GildedRose(items);
      let newItems = gildedRose.updateQuality();

      expect(newItems[0].quality).toStrictEqual(expectedItems[0].quality);
    });

    //third case: backstage passes
    it('should run an update once over backstage passes', () => {
      const items = [
        new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
        new Item('Backstage passes to a TAFKAL80ETC concert', 10, 39),
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)
      ];
      const expectedItems = [
        new Item('Backstage passes to a TAFKAL80ETC concert', 14, 21),
        new Item('Backstage passes to a TAFKAL80ETC concert', 9, 41),
        new Item('Backstage passes to a TAFKAL80ETC concert', 4, 50)
      ];

      const gildedRose = new GildedRose(items);
      let newItems = gildedRose.updateQuality();

      expect(newItems).toStrictEqual(expectedItems);
    });

    it('should run an update trice over backstage passes', () => {
      const items = [
        new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
        new Item('Backstage passes to a TAFKAL80ETC concert', 7, 39),
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)
      ];
      const expectedItems = [
        new Item('Backstage passes to a TAFKAL80ETC concert', 12, 23),
        new Item('Backstage passes to a TAFKAL80ETC concert', 4, 47),
        new Item('Backstage passes to a TAFKAL80ETC concert', 2, 50)
      ];

      const gildedRose = new GildedRose(items);
      //1
      let newItems = gildedRose.updateQuality();
      //2
      newItems = gildedRose.updateQuality();
      //3
      newItems = gildedRose.updateQuality();      

      expect(newItems).toStrictEqual(expectedItems);
    });

    //fourth case: Conjured
    it('it should decrease quality of conjured items with 2', () => {
      const items = [new Item('Conjured Mana Cake', 6, 12)];
      const expectedItems = [new Item('Conjured Mana Cake', 5, 10)];
      const gildedRose = new GildedRose(items);
      let newItems = gildedRose.updateQuality();

      expect(newItems[0].quality).toStrictEqual(expectedItems[0].quality);
    });

    it('it should decrease quality of conjured items with 4 when sellIn has passed', () => {
      const items = [new Item('Conjured Mana Cake', 1, 12)];
      const expectedItems = [new Item('Conjured Mana Cake', -1, 6)];
      const gildedRose = new GildedRose(items);
      //1
      let newItems = gildedRose.updateQuality();
      //2
      newItems = gildedRose.updateQuality();

      expect(newItems[0].quality).toStrictEqual(expectedItems[0].quality);
    });
  
  });
});
