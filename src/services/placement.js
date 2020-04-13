const placement = [
  ["player1"],
  ["player1", "player5"],
  ["player1", "player4", "player6"],
  ["player1", "player3", "player5", "player7"],
  ["player1", "player3", "player4", "player6", "player7"],
  ["player1", "player3", "player4", "player5", "player6", "player7"],
  ["player1", "player2", "player3", "player4", "player5", "player6", "player7"],
  [
    "player1",
    "player2",
    "player3",
    "player4",
    "player5",
    "player6",
    "player7",
    "player8",
  ],
];
export function placePlayers(players) {
  const placementByPlayers = placement[players.length - 1];
  return players.map((p, i) => ({ ...p, place: placementByPlayers[i] }));
}
