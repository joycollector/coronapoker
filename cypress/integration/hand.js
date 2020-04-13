import {
  ROYAL_FLUSH,
  STRAIGHT_FLUSH,
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  FLUSH,
  STRAIGHT,
  SET,
  TWO_PAIR,
  PAIR,
  HIGH_CARD,
  getBestHand,
} from "../../src/services/hand";

describe("Hand Service", () => {
  it("HIGH CARD same hands", async () => {
    expect(
      HIGH_CARD.compare(
        ["Q1", "K1", "J2", "82", "T3", "21", "32"],
        ["Q1", "K1", "J2", "82", "T3", "51", "62"]
      )
    ).to.eq(0);
  });

  it("HIGH CARD compare", async () => {
    const sortResult = [
      ["Q1", "K1", "J2", "82", "43", "51", "62"],
      ["Q1", "K1", "J2", "82", "T3", "21", "32"],
    ].sort((a, b) => HIGH_CARD.compare(a, b));
    expect(sortResult[1]).to.eql(["Q1", "K1", "J2", "82", "T3", "21", "32"]);
  });
  it("HIGH CARD get best 5 of 7", async () => {
    expect(HIGH_CARD.match(["Q1", "K1", "J2", "82", "43", "51", "62"])).to.eql([
      "K1",
      "Q1",
      "J2",
      "82",
      "62",
    ]);
  });

  it("PAIR match", async () => {
    expect(PAIR.match(["Q1", "K1", "J2", "82", "43", "41", "62"])).to.eql([
      "41",
      "43",
      "K1",
      "Q1",
      "J2",
    ]);
  });
  it("PAIR no match", async () => {
    expect(PAIR.match(["Q1", "K1", "J2", "82", "43", "51", "62"])).to.eq(
      undefined
    );
  });
  it("PAIR compare", async () => {
    const sortResult = [
      ["Q1", "K1", "J2", "82", "K3", "51", "62"],
      ["Q1", "K1", "J2", "82", "T3", "J1", "32"],
    ].sort((a, b) => PAIR.compare(a, b));
    expect(sortResult[1]).to.eql(["Q1", "K1", "J2", "82", "K3", "51", "62"]);
  });

  it("TWO_PAIR match", async () => {
    expect(TWO_PAIR.match(["61", "K1", "J2", "82", "43", "41", "62"])).to.eql([
      "62",
      "61",
      "41",
      "43",
      "K1",
    ]);
  });
  it("TWO_PAIR no match", async () => {
    expect(TWO_PAIR.match(["Q1", "K1", "J2", "82", "53", "51", "62"])).to.eq(
      undefined
    );
  });
  it("TWO_PAIR compare", async () => {
    const sortResult = [
      ["61", "K1", "J2", "82", "Q3", "Q1", "K2"],
      ["21", "K1", "J2", "82", "A3", "A1", "22"],
    ].sort((a, b) => TWO_PAIR.compare(a, b));
    expect(sortResult[1]).to.eql(["21", "K1", "J2", "82", "A3", "A1", "22"]);
  });

  it("SET match", async () => {
    expect(SET.match(["Q1", "42", "J2", "82", "43", "41", "62"])).to.eql([
      "41",
      "43",
      "42",
      "Q1",
      "J2",
    ]);
  });
  it("SET no match", async () => {
    expect(SET.match(["Q1", "K1", "42", "82", "43", "51", "62"])).to.eq(
      undefined
    );
  });
  it("SET compare", async () => {
    const sortResult = [
      ["K2", "K1", "J2", "82", "K3", "51", "62"],
      ["K4", "K1", "J2", "82", "K3", "51", "A2"],
    ].sort((a, b) => SET.compare(a, b));
    expect(sortResult[1]).to.eql(["K4", "K1", "J2", "82", "K3", "51", "A2"]);
  });

  it("STRAIGHT match", async () => {
    expect(STRAIGHT.match(["71", "42", "J2", "82", "53", "41", "62"])).to.eql([
      "82",
      "71",
      "62",
      "53",
      "41",
    ]);
  });
  it("STRAIGHT match", async () => {
    expect(STRAIGHT.match(["71", "42", "J2", "82", "53", "61", "62"])).to.eql([
      "82",
      "71",
      "62",
      "53",
      "42",
    ]);
  });
  it("STRAIGHT [J-Q-K-A-2] match", async () => {
    expect(STRAIGHT.match(["Q1", "K2", "J2", "82", "A3", "21", "62"])).to.eql([
      "21",
      "A3",
      "K2",
      "Q1",
      "J2",
    ]);
  });
  it("STRAIGHT compare", async () => {
    const sortResult = [
      ["71", "42", "J2", "82", "53", "61", "62"],
      ["Q1", "K2", "J2", "82", "A3", "21", "62"],
    ].sort((a, b) => STRAIGHT.compare(a, b));
    expect(sortResult[1]).to.eql(["71", "42", "J2", "82", "53", "61", "62"]);
  });

  it("FLUSH match", async () => {
    expect(FLUSH.match(["Q2", "42", "J2", "82", "32", "41", "62"])).to.eql([
      "Q2",
      "J2",
      "82",
      "62",
      "42",
    ]);
  });
  it("FLUSH no match", async () => {
    expect(FLUSH.match(["Q1", "K1", "42", "81", "43", "51", "62"])).to.eq(
      undefined
    );
  });
  it("FLUSH compare", async () => {
    const sortResult = [
      ["K2", "K1", "J2", "82", "K3", "52", "62"],
      ["A4", "K1", "24", "34", "44", "51", "64"],
    ].sort((a, b) => FLUSH.compare(a, b));
    expect(sortResult[1]).to.eql(["A4", "K1", "24", "34", "44", "51", "64"]);
  });

  it("FULL_HOUSE match", async () => {
    expect(
      FULL_HOUSE.match(["61", "42", "J2", "82", "43", "41", "62"])
    ).to.eql(["41", "43", "42", "62", "61"]);
  });
  it("FULL_HOUSE no match", async () => {
    expect(FULL_HOUSE.match(["Q1", "K1", "42", "82", "43", "41", "62"])).to.eq(
      undefined
    );
  });
  it("FULL_HOUSE compare", async () => {
    const sortResult = [
      ["K2", "K1", "J2", "82", "K3", "51", "52"],
      ["24", "21", "A2", "82", "23", "51", "A2"],
    ].sort((a, b) => FULL_HOUSE.compare(a, b));
    expect(sortResult[1]).to.eql(["K2", "K1", "J2", "82", "K3", "51", "52"]);
  });

  it("FOUR_OF_A_KIND match", async () => {
    expect(
      FOUR_OF_A_KIND.match(["61", "42", "J2", "82", "43", "41", "44"])
    ).to.eql(["42", "43", "41", "44", "J2"]);
  });
  it("FOUR_OF_A_KIND no match", async () => {
    expect(
      FOUR_OF_A_KIND.match(["Q1", "K1", "42", "82", "43", "41", "62"])
    ).to.eq(undefined);
  });
  it("FOUR_OF_A_KIND compare", async () => {
    const sortResult = [
      ["61", "42", "Q2", "82", "43", "41", "44"],
      ["61", "42", "J2", "82", "43", "41", "44"],
    ].sort((a, b) => FOUR_OF_A_KIND.compare(a, b));
    expect(sortResult[1]).to.eql(["61", "42", "Q2", "82", "43", "41", "44"]);
  });

  it("STRAIGHT_FLUSH no match", async () => {
    expect(
      STRAIGHT_FLUSH.match(["71", "42", "J2", "82", "53", "41", "62"])
    ).to.eql(undefined);
  });
  it("STRAIGHT_FLUSH match", async () => {
    expect(
      STRAIGHT_FLUSH.match(["71", "41", "J2", "81", "51", "61", "62"])
    ).to.eql(["81", "71", "61", "51", "41"]);
  });

  it("ROYAL_FLUSH no match", async () => {
    expect(
      ROYAL_FLUSH.match(["71", "41", "J2", "81", "51", "61", "62"])
    ).to.eql(undefined);
  });
  it("ROYAL_FLUSH no match", async () => {
    expect(
      ROYAL_FLUSH.match(["T1", "J1", "Q2", "K1", "A1", "61", "62"])
    ).to.eql(undefined);
  });
  it("ROYAL_FLUSH match", async () => {
    expect(
      ROYAL_FLUSH.match(["T1", "J1", "Q1", "K1", "A1", "61", "62"])
    ).to.eql(["A1", "K1", "Q1", "J1", "T1"]);
  });

  it("getBestHand", async () => {
    const table = ["21", "41", "53", "64", "A1"];
    const players = {
      vasya: ["A2", "A3"],
      petr: ["31", "T2"],
      valera: ["J1", "T1"],
    };

    const result = getBestHand(table, players);

    expect(result.name).to.eq("valera");
    expect(result.rank).to.eq(5);
    expect(result.match).to.eql(["A1", "J1", "T1", "41", "21"]);
  });
});
