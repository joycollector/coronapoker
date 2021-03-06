// import randomNumber from "random-number-csprng";

export const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * Math.floor(i));
    // j = await randomNumber(0, i);
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export function getRandomPack() {
  const suits = [1, 2, 3, 4];
  const cards = cardValues.flatMap((value) =>
    suits.map((suit) => `${value}${suit}`)
  );
  return shuffle(cards);
}

export function getCards(n, used = []) {
  const usedSet = new Set(used);
  if (usedSet.size + n > cardValues.length * 4) {
    throw new Error(
      `can not generate ${n} cards for ${usedSet.size} used cards`
    );
  }

  return (getRandomPack()).filter(card => !used.includes(card)).slice(0, n);
}
