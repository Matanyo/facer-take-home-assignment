import { decreaseSellIn } from "./facer-watches-utils";

export enum WatchName {
  Legendary = "Legendary Watch Face",
  Rolex = "Vintage Rolex",
  Conference = "Passes to Watchface Conference",
  Fragile = "Fragile",
  Default = "Default",
}

export const watchesConfig = {
  [WatchName.Rolex]: {
    maxQuality: 50,
    qualityIncrement: 1, // Increment per day as it ages
  },
  [WatchName.Conference]: {
    maxQuality: 50,
    minQuality: 0,
    qualityIncrement: 1, // Base quality increment per day
    qualityIncrementNear: 2, // Increment when 10 or fewer days are left
    qualityIncrementVeryNear: 3, // Increment when 5 or fewer days are left
    nearSellByDays: 10,
    veryNearSellByDays: 5,
  },
  [WatchName.Fragile]: {
    maxQuality: 50,
    minQuality: 0,
    qualityDecrementBeforeSellBy: 2, // Daily decrement before sell-by
    qualityDecrementAfterSellBy: 4, // Daily decrement after sell-by
  },
  [WatchName.Default]: {
    maxQuality: 50,
    minQuality: 0,
    qualityDecrementBeforeSellBy: 1, // Daily decrement before sell-by
    qualityDecrementAfterSellBy: 2, // Daily decrement after sell-by
  },
  [WatchName.Legendary]: {
    maxQuality: 80, // Legendary watches maintain a fixed quality of 80
  },
};

export const watchesMethods = {
  [WatchName.Legendary]: {
    getQuality: (item) => item.quality,
    getSellIn: (item) => item.sellIn,
  },
  [WatchName.Rolex]: {
    getQuality: (item) => {
      const { maxQuality, qualityIncrement } = watchesConfig[WatchName.Rolex];
      return Math.min(maxQuality, item.quality + qualityIncrement);
    },
    getSellIn: decreaseSellIn,
  },
  [WatchName.Conference]: {
    getQuality: (item) => {
      const {
        maxQuality,
        minQuality,
        qualityIncrement,
        qualityIncrementNear,
        qualityIncrementVeryNear,
        nearSellByDays,
        veryNearSellByDays,
      } = watchesConfig[WatchName.Conference];
      if (item.sellIn <= 0) return minQuality;
      if (item.quality >= maxQuality) return item.quality;

      let totalIncrement = qualityIncrement;

      if (item.sellIn <= veryNearSellByDays) {
        totalIncrement = qualityIncrementVeryNear;
      } else if (item.sellIn <= nearSellByDays) {
        totalIncrement = qualityIncrementNear;
      }

      return Math.min(maxQuality, item.quality + totalIncrement);
    },
    getSellIn: decreaseSellIn,
  },
  [WatchName.Default]: {
    getQuality: (item) => {
      const {
        qualityDecrementBeforeSellBy,
        qualityDecrementAfterSellBy,
        minQuality,
      } = watchesConfig[item.name] || watchesConfig[WatchName.Default];
      const qualityDecrement =
        item.sellIn <= 0
          ? qualityDecrementAfterSellBy
          : qualityDecrementBeforeSellBy;
      return Math.max(minQuality, item.quality - qualityDecrement);
    },
    getSellIn: decreaseSellIn,
  },
};
