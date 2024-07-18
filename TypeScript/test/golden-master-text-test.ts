import { Item, FacerStore } from "../app/facer-store";

const items = [
  new Item("Seiko Watch", 10, 20), //
  new Item("Vintage Rolex", 2, 0), //
  new Item("Casio Watch", 5, 7), //
  new Item("Legendary Watch Face", 0, 80), //
  new Item("Legendary Watch Face", -1, 80),
  new Item("Passes to Watchface Conference", 15, 20),
  new Item("Passes to Watchface Conference", 10, 49),
  new Item("Passes to Watchface Conference", 5, 49),
  new Item("Fragile Watch", 3, 6),
];

const facerStore = new FacerStore(items);

let days: number = 2;
if (process.argv.length > 2) {
  days = +process.argv[2];
}

for (let i = 0; i < days + 1; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach((element) => {
    console.log(element.name + ", " + element.sellIn + ", " + element.quality);
  });
  console.log();
  facerStore.updateDailyItems();
}
