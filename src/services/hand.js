import { cardValues } from "./pack";

const compareByValue = ([v1], [v2]) =>
  cardValues.indexOf(v1) - cardValues.indexOf(v2);

function compareByHighCard(firstSortedDesc, secondSortedDesc) {
  for (let i = 0; i < firstSortedDesc.length; i++) {
    const cmp = compareByValue(firstSortedDesc[i], secondSortedDesc[i]);
    if (cmp) {
      return cmp;
    }
  }
  return 0;
}

const defaultCompare = function (first, second) {
  const firstSortedDesc = this.match(first);
  const secondSortedDesc = this.match(second);

  return compareByHighCard(firstSortedDesc, secondSortedDesc);
};
export const HIGH_CARD = {
  name: "High Card",
  rank: 0,
  match: function (cards) {
    return [...cards].sort(compareByValue).reverse().slice(0, 5);
  },
  compare: defaultCompare,
};

export const PAIR = {
  name: "Pair",
  rank: 1,
  match: function (cards) {
    const sorted = [...cards].sort(compareByValue).reverse();
    for (let i = 0; i < sorted.length - 1; i++) {
      if (compareByValue(sorted[i], sorted[i + 1]) === 0) {
        const pair = [sorted[i], sorted[i + 1]];
        return [
          ...pair,
          ...sorted.filter((each) => !pair.includes(each)).slice(0, 3),
        ];
      }
    }
  },
  compare: defaultCompare,
};

export const TWO_PAIR = {
  name: "Two Pair",
  rank: 2,
  match: function (cards) {
    const firstPairMatch = PAIR.match(cards);
    if (firstPairMatch) {
      const firstPair = firstPairMatch.slice(0, 2);
      const secondPairMatch = PAIR.match(
        cards.filter((each) => !firstPair.includes(each))
      );
      if (secondPairMatch) {
        return [...firstPair, ...secondPairMatch.slice(0, 3)];
      }
    }
  },
  compare: defaultCompare,
};

export const SET = {
  name: "Set",
  rank: 3,
  match: function (cards) {
    const sorted = [...cards].sort(compareByValue).reverse();
    for (let i = 0; i < sorted.length - 2; i++) {
      if (
        compareByValue(sorted[i], sorted[i + 1]) === 0 &&
        compareByValue(sorted[i + 1], sorted[i + 2]) === 0
      ) {
        const set = [sorted[i], sorted[i + 1], sorted[i + 2]];
        return [
          ...set,
          ...sorted.filter((each) => !set.includes(each)).slice(0, 2),
        ];
      }
    }
  },
  compare: defaultCompare,
};

function isStraight(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const [v1] = arr[i];
    const [v2] = arr[i + 1];
    const cost1 = cardValues.indexOf(v1);
    const cost2 = cardValues.indexOf(v2);
    if (cost1 !== cost2 + 1) {
      return false;
    }
  }
  return true;
}

export const STRAIGHT = {
  name: "Straight",
  rank: 4,
  match: function (cards) {
    const sorted = [...cards]
      .sort(compareByValue)
      .reverse()
      .reduce((acc, card) => {
        if (acc.find((each) => compareByValue(card, each) === 0)) {
          return acc;
        }
        return [...acc, card];
      }, []);

    for (let i = 0; i < sorted.length - 4; i++) {
      const subarray = sorted.slice(i, i + 5);
      if (isStraight(subarray)) {
        return subarray;
      }
    }

    const two = sorted.find(([v]) => v === "2");
    if (two) {
      const head = sorted.slice(0, 4);
      if (head[0][0] === "A" && isStraight(head)) {
        return [two, ...head];
      }
    }
  },
  compare: defaultCompare,
};

export const FLUSH = {
  name: "Flush",
  rank: 5,
  match: function (cards) {
    const sorted = [...cards].sort(compareByValue).reverse();
    for (let suit = 1; suit <= 4; suit++) {
      const sameSuit = sorted.filter(([, s]) => s === `${suit}`);
      if (sameSuit.length >= 5) {
        return sameSuit.slice(0, 5);
      }
    }
  },
  compare: defaultCompare,
};

export const FULL_HOUSE = {
  name: "Full House",
  rank: 6,
  match: function (cards) {
    const setMatch = SET.match(cards);
    if (setMatch) {
      const set = setMatch.slice(0, 3);
      const pairMatch = PAIR.match(cards.filter((each) => !set.includes(each)));
      if (pairMatch) {
        return [...set, ...pairMatch.slice(0, 2)];
      }
    }
  },
  compare: defaultCompare,
};

export const FOUR_OF_A_KIND = {
  name: "Four of a kind",
  rank: 7,
  match: function (cards) {
    for (let value of cardValues) {
      const four = cards.filter(([v]) => v === value);
      if (four.length === 4) {
        const highCard = [...cards]
          .filter(([v]) => v !== value)
          .sort(compareByValue)
          .reverse()[0];
        return [...four, highCard];
      }
    }
  },
  compare: defaultCompare,
};

export const STRAIGHT_FLUSH = {
  name: "Straight Flush",
  rank: 8,
  match: function (cards) {
    for (let suit = 1; suit <= 4; suit++) {
      const sameSuit = cards.filter(([, s]) => s === `${suit}`);
      if (sameSuit.length >= 5) {
        const straight = STRAIGHT.match(sameSuit);
        if (straight) {
          return straight;
        }
      }
    }
  },
  compare: defaultCompare,
};

export const ROYAL_FLUSH = {
  name: "Royal Flush",
  rank: 9,
  match: function (cards) {
    const straightFlushMatch = STRAIGHT_FLUSH.match(cards);
    if (straightFlushMatch && straightFlushMatch[0][0] === "A") {
      return straightFlushMatch;
    }
  },
  compare: defaultCompare,
};

const HANDS = [
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
];

// bullshit implementation, just to make sure the concept works
export function getBestHand(table, players) {

  const matchingResult = Object.entries(players).map(([ name, playerCards ]) => {
    const cards = [...table, ...playerCards];
    return ({
      name,
      cards,
      definition: HANDS.find(eachDefinition => eachDefinition.match(cards))
    });
  }).sort((a, b) => {
    if (a.definition.rank === b.definition.rank) {
      return a.definition.compare(a.cards, b.cards);
    }
    return a.definition.rank - b.definition.rank;
  });
  const winner = matchingResult[matchingResult.length - 1];
  return {
    name: winner.name,
    rank: winner.definition.rank,
    match: winner.definition.match(winner.cards)
  };
}
