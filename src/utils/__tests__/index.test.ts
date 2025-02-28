import {
  getLongestTime,
  getPriceInRoubles,
  getTransferTime,
  numWord,
  randId,
  renderTime,
} from "../index";
import { tickets } from "../../data/dummy";

describe("numWord", () => {
  const items = ["билет", "билета", "билетов"];

  it("correctly write with 0 item", () => {
    expect(numWord(0, items)).toEqual(items[2]);
  });

  it("correctly write with 1 item", () => {
    expect(numWord(1, items)).toEqual(items[0]);
  });

  it("correctly write with 2 items", () => {
    expect(numWord(2, items)).toEqual(items[1]);
  });

  it("correctly write with 5 items", () => {
    expect(numWord(5, items)).toEqual(items[2]);
  });

  it("correctly write with 15 items", () => {
    expect(numWord(15, items)).toEqual(items[2]);
  });

  it("throws on negative items", () => {
    expect(() => numWord(-1, items)).toThrowError();
  });

  it("throws on incorrect items array", () => {
    expect(() => numWord(1, [])).toThrowError();
  });
});

describe("randId", () => {
  it("should generate string value", () => {
    expect(typeof randId()).toEqual("string");
  });

  it("should generate unique values", () => {
    const id1 = randId();
    const id2 = randId();

    expect(id1 === id2).toBeFalsy();
  });
});

describe("renderTime", () => {
  const date = Date.parse("07-30-2022 22:15");

  it("should write correct time", () => {
    expect(renderTime(date)).toEqual("22:15");
  });

  it("throws on incorrect time", () => {
    expect(() => renderTime(-1)).toThrowError();
  });
});

describe("getTransferTime", () => {
  const hours = 1;
  const minutes = 20;
  const transferTime = (hours * 60 + minutes) * 60 * 1000;

  it("writes correct time", () => {
    expect(getTransferTime(transferTime)).toEqual([hours, minutes]);
  });

  it("writes correct time with 0", () => {
    expect(getTransferTime(0)).toEqual([0, 0]);
  });

  it("throws on negative time", () => {
    expect(() => getTransferTime(-1)).toThrowError();
  });
});

describe("getLongestTime", () => {
  const ticketA = tickets[0];
  const ticketB = tickets[1];

  it("returns longest duration", () => {
    expect(getLongestTime(ticketA, ticketB)).toBeGreaterThan(0);
    expect(getLongestTime(ticketB, ticketA)).toBeLessThan(0);
  });
});

describe("getPriceInRoubles", () => {
  it("returns string value", () => {
    expect(typeof getPriceInRoubles(1)).toEqual("string");
  });

  it("returns price in roubles", () => {
    expect(getPriceInRoubles(1).slice(-1)).toEqual("₽");
  });

  it("returns correct price", () => {
    expect(getPriceInRoubles(1).slice(0, -2)).toEqual("1");
  });

  it("throws on negative price", () => {
    expect(() => getPriceInRoubles(-1)).toThrowError();
  });
});
