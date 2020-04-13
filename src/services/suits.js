export function getSuitById(i) {
  switch (i) {
    case 1:
      return "Diamonds";
    case 2:
      return "Clubs";
    case 3:
      return "Hearts";
    case 4:
      return "Spades";
    default:
      throw "Unknown";
  }
}
