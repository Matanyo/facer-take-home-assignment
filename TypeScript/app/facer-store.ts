import { watchesMethods } from "./facer-watches";

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

export class FacerStore {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateDailyItems() {
    this.items.forEach((item) => {
      this.updateQuality(item);
      this.updateSellIn(item);
    });
    return this.items;
  }

  updateQuality(item) {
    const { getQuality } =
      watchesMethods[item.name] || watchesMethods["Default"];

    const newQuality = getQuality(item);
    item.quality = newQuality;
    return item;
  }

  updateSellIn(item) {
    const { getSellIn } =
      watchesMethods[item.name] || watchesMethods["Default"];
    const newSellIn = getSellIn(item);
    item.sellIn = newSellIn;
    return item;
  }
}
