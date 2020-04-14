import ROUND_TYPES from "@Utils/roundTypes";
import { v4 as uuid } from "uuid";
import { gun } from "../../../server";

export async function post(req, res) {
  const stages = gun.get("stages");
  const rounds = gun.get("rounds");
  const game = gun.get("games").get(req.params.gameId);
  const players = Object.entries(await game.get("players").then())
    .filter(([name]) => name !== "_")
    .map(([name, money]) => ({ name, money }));

  const dealerIndex = 0; // Get random
  const sbIndex = dealerIndex + 1; // Calculate
  const bbIndex = dealerIndex + 2; // Calculate
  const active = dealerIndex + 3; // Calculate

  // Create round
  const round = players.reduce((res, { name }, index) => {
    const amount = index === sbIndex ? 20 : index === bbIndex ? 10 : 0;
    const type = index === active ? ROUND_TYPES.ACTIVE : ROUND_TYPES.PENDING;
    res[name] = { amount, type };
    return res;
  }, { id: uuid() });
  const roundRef = rounds.get(round.id).put(round);

  // Create stage
  const stage = { id: uuid(), dealer: players[dealerIndex].name };
  const stageRef = stages.get(stage.id).put(stage);

  // Set current round
  stageRef.get("round").put(roundRef);

  // Set current stage
  game.get("stage").put(stageRef);
}
