import { Item, FacerStore } from "@/facer-store";

describe("Fragile Watch Tests", () => {
  it("should degrade quality by 2 each day before the sell-by date", () => {
    const fragileWatch = new Item("Fragile", 5, 10); // Initial quality is 10, 5 days before sell-by
    const facerStore = new FacerStore([fragileWatch]);
    facerStore.updateDailyItems();
    expect(fragileWatch.sellIn).toBe(4);
    expect(fragileWatch.quality).toBe(8); // Quality should decrease by 2
  });

  it("should degrade quality by 4 each day after the sell-by date has passed", () => {
    const fragileWatch = new Item("Fragile", 0, 10); // Initial quality is 10, on the sell-by date
    const facerStore = new FacerStore([fragileWatch]);
    facerStore.updateDailyItems();
    expect(fragileWatch.sellIn).toBe(-1);
    expect(fragileWatch.quality).toBe(6); // Quality should decrease by 4
  });
});

describe("Passes to Watchface Conference Tests", () => {
  it("should increase in quality by 1 when there are more than 10 days left to the conference", () => {
    const conferenceWatch = new Item("Passes to Watchface Conference", 11, 10);
    const facerStore = new FacerStore([conferenceWatch]);
    facerStore.updateDailyItems();
    expect(conferenceWatch.sellIn).toBe(10);
    expect(conferenceWatch.quality).toBe(11); // Quality increases by 1
  });

  it("should increase in quality by 2 when there are 10 days or less left to the conference", () => {
    const conferenceWatch = new Item("Passes to Watchface Conference", 10, 10);
    const facerStore = new FacerStore([conferenceWatch]);
    facerStore.updateDailyItems();
    expect(conferenceWatch.sellIn).toBe(9);
    expect(conferenceWatch.quality).toBe(12); // Quality increases by 2
  });

  it("should increase in quality by 3 when there are 5 days or less left to the conference", () => {
    const conferenceWatch = new Item("Passes to Watchface Conference", 5, 10);
    const facerStore = new FacerStore([conferenceWatch]);
    facerStore.updateDailyItems();
    expect(conferenceWatch.sellIn).toBe(4);
    expect(conferenceWatch.quality).toBe(13); // Quality increases by 3
  });

  it("should drop quality to 0 after the conference", () => {
    const conferenceWatch = new Item("Passes to Watchface Conference", 0, 20);
    const facerStore = new FacerStore([conferenceWatch]);
    facerStore.updateDailyItems();
    expect(conferenceWatch.sellIn).toBe(-1);
    expect(conferenceWatch.quality).toBe(0); // Quality drops to 0 after the conference
  });

  it("should not allow quality to increase beyond 50", () => {
    const conferenceWatch = new Item("Passes to Watchface Conference", 11, 50);
    const facerStore = new FacerStore([conferenceWatch]);
    facerStore.updateDailyItems();
    expect(conferenceWatch.sellIn).toBe(10);
    expect(conferenceWatch.quality).toBe(50); // Quality increases but capped at 50
  });
});

describe("Legendary Watch Face Tests", () => {
  it("should not change in quality as days pass", () => {
    const legendaryWatch = new Item("Legendary Watch Face", 5, 80);
    const facerStore = new FacerStore([legendaryWatch]);
    facerStore.updateDailyItems();
    expect(legendaryWatch.sellIn).toBe(5); // Checking if sellIn changes which it should not as per requirements
    expect(legendaryWatch.quality).toBe(80); // Quality should remain constant at 80
  });

  it("should retain quality regardless of the initial sellIn value", () => {
    const legendaryWatch = new Item("Legendary Watch Face", 0, 80); // Edge case: sellIn at 0
    const facerStore = new FacerStore([legendaryWatch]);
    facerStore.updateDailyItems();
    expect(legendaryWatch.sellIn).toBe(0); // sellIn should remain unchanged
    expect(legendaryWatch.quality).toBe(80); // Quality remains 80 despite sellIn being 0
  });

  it("should maintain quality even if sellIn is negative", () => {
    const legendaryWatch = new Item("Legendary Watch Face", -10, 80); // Test with negative sellIn
    const facerStore = new FacerStore([legendaryWatch]);
    facerStore.updateDailyItems();
    expect(legendaryWatch.sellIn).toBe(-10); // Confirm negative sellIn remains unchanged
    expect(legendaryWatch.quality).toBe(80); // Quality still stays at 80
  });
});

describe("Vintage Rolex Tests", () => {
  it("should increase in quality by 1 as it ages when more than 10 days remain", () => {
    const vintageRolex = new Item("Vintage Rolex", 15, 10);
    const facerStore = new FacerStore([vintageRolex]);
    facerStore.updateDailyItems();
    expect(vintageRolex.sellIn).toBe(14);
    expect(vintageRolex.quality).toBe(11);
  });

  it("should not allow quality to increase beyond 50", () => {
    const vintageRolex = new Item("Vintage Rolex", 15, 49);
    const facerStore = new FacerStore([vintageRolex]);
    facerStore.updateDailyItems();
    expect(vintageRolex.sellIn).toBe(14);
    expect(vintageRolex.quality).toBe(50); // Quality should increase but not exceed 50
  });
});

describe("Normal Watch Tests", () => {
  it("should degrade quality by 1 and sellIn by 1 when sellIn is above 0", () => {
    const normalWatch = new Item("Normal Watch", 10, 20);
    const facerStore = new FacerStore([normalWatch]);
    facerStore.updateDailyItems();
    expect(normalWatch.sellIn).toBe(9);
    expect(normalWatch.quality).toBe(19);
  });

  it("should degrade quality twice as fast once the sell-by date has passed", () => {
    const normalWatch = new Item("Normal Watch", 0, 20);
    const facerStore = new FacerStore([normalWatch]);
    facerStore.updateDailyItems();
    expect(normalWatch.sellIn).toBe(-1);
    expect(normalWatch.quality).toBe(18);
  });

  it("should not allow quality to be negative", () => {
    const normalWatch = new Item("Normal Watch", 5, 0);
    const facerStore = new FacerStore([normalWatch]);
    facerStore.updateDailyItems();
    expect(normalWatch.sellIn).toBe(4);
    expect(normalWatch.quality).toBe(0);
  });
});
