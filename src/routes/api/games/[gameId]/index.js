import ROUND_TYPES from "@Utils/roundTypes";
import { gun } from "../../../../server";
import { getRandomPack } from "@Services/pack";

const BIG_BLIND = 20;
const SMALL_BLIND = 10;

export async function post(req, res) {
  try {
    const stages = gun.get("stages");
    const rounds = gun.get("rounds");
    const game = gun.get("games").get(req.params.gameId);

    const players = Object.entries(await game.get("players").then())
      .filter(([name]) => name !== "_")
      .map(([name, money]) => ({ name, money }));

    // Shuffle deck
    const deck = getRandomPack();

    // Deal cards
    const cards = players.reduce((res, { name }, index) => {
      res[name] = JSON.stringify(deck.splice(0, 2));
      return res;
    }, {});

    // Create round
    const dealerIndex = Math.floor(Math.random() * Math.floor(players.length));
    const sbIndex = (dealerIndex + 1) % players.length;
    const bbIndex = (dealerIndex + 2) % players.length;
    const active = (dealerIndex + 3) % players.length;

    const round = players.reduce((res, { name }, index) => {
      const amount = index === sbIndex ? BIG_BLIND : index === bbIndex ? SMALL_BLIND : 0;
      const type = index === active ? ROUND_TYPES.ACTIVE : ROUND_TYPES.PENDING;
      res[name] = { amount, type };
      return res;
    }, {});
    const roundRef = rounds.set(round);

    // Pay blinds
    game.get("players").get(players[bbIndex].name).put(players[bbIndex].money - BIG_BLIND);
    game.get("players").get(players[sbIndex].name).put(players[sbIndex].money - SMALL_BLIND);

    // Create stage
    const stage = { dealer: players[dealerIndex].name };
    const stageRef = stages.set(stage);

    // Set current round
    stageRef.get("round").put(roundRef);

    // Set current cards
    stageRef.get("cards").put(cards);

    // Set cu rrent stage
    game.get("stage").put(stageRef);

    // Set current deck
    game.get("deck").put(JSON.stringify(deck));
    res.end();
  } catch (e) {
    res.end(e);
  }
}
