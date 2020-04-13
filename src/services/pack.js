import randomNumber from "random-number-csprng";

const values = [
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

async function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = await randomNumber(0, i);
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export async function getRandomPack() {
  const suits = [1, 2, 3, 4];
  const cards = values.flatMap((value) =>
    suits.map((suit) => `${value}${suit}`)
  );
  return shuffle(cards);
}

export async function getCards(n, used = []) {
  const usedSet = new Set(used);
  if (usedSet.size + n > values.length * 4) {
    throw new Error(
      `can not generate ${n} cards for ${usedSet.size} used cards`
    );
  }

  return (await getRandomPack()).filter(card => !used.includes(card)).slice(0, n);
}
