import { Item, GildedRose } from '@/gilded-rose';

/**
 * This unit test uses [Jest Snapshot](https://goo.gl/fbAQLP).
 * 
 * There are two test cases here with different styles:
 * <li>"foo" is more similar to the unit test from the 'Java' version
 * <li>"thirtyDays" is more similar to the TextTest from the 'Java' version
 *
 * I suggest choosing one style to develop and deleting the other.
 */

describe('Gilded Rose Approval', () => {

  let gameConsoleOutput: string;
  let originalConsoleLog: (message: any) => void;
  let originalProcessArgv: string[]

  function gameConsoleLog(msg: string) {
    if (msg) {
      gameConsoleOutput += msg;
    }
    gameConsoleOutput += "\n";
  }

  beforeEach(() => {
    // prepare capturing console.log to our own gameConsoleLog.
    gameConsoleOutput = "";
    originalConsoleLog = console.log;
    console.log = gameConsoleLog;
    originalProcessArgv = process.argv;
  });

  afterEach(() => {
    // reset original console.log
    console.log = originalConsoleLog;
    process.argv = originalProcessArgv;
  });

  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    console.log(gildedRose);
    const items = gildedRose.updateQuality();
  
    expect(items).toMatchSnapshot();
  });

  it('should not be Sulfuras, Hand of Ragnaros', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 3, 1)]);
    const items = gildedRose.updateQuality();
  
    expect(items[0].name).toBe('Aged Brie');
  });

  //it should not be sulfuras
  //it (sellIn) should be bigger then 0
  //else
  //it should be brie
  //it should be passes
  //sellIn should be between 5 and 10
  //sellIn should be lower then 5

  /* it('should thirtyDays', () => {
    process.argv = ["<node>", "<script", "30"];
    require('../golden-master-text-test.ts');
       
    expect(gameConsoleOutput).toMatchSnapshot();
  }); */

});
