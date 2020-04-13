import { getCards, getRandomPack } from "../../src/services/pack";

const CARD_REGEX = /[23456789TJQKA][1-4]/;
describe("Pack Service", () => {
  it("get random pack", async () => {
    expect((await getRandomPack()).length).to.eq(52);
  });

  it("return empty array for n = 0", async () => {
    expect((await getCards(0, [])).length).to.eq(0);
  });

  it("returns 1 card for n = 1", async () => {
    expect((await getCards(1, [])).length).to.eq(1);
  });

  it("generates proper card definition", async () => {
    expect((await getCards(1, []))[0]).to.match(CARD_REGEX);
  });

  it("returns 52 cards for n = 52", async () => {
    expect((await getCards(52, [])).length).to.eq(52);
  });

  it("returns 10 cards for n = 10 and used.length == 42", async () => {
    const used = await getCards(42, []);
    expect((await getCards(10, used)).length).to.eq(10);
  });

  it("throws for n > 52", async () => {
    expect((await getCards.bind(null, 53, []))).to.throw;
  });

  it("all the cards are unique and match regex", async () => {
    const cards = await getCards(52);
    expect(new Set(cards).size).to.eq(52);
    cards.forEach(card => expect(card).to.match(CARD_REGEX));
  });
});
