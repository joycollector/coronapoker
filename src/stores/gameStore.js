import uuid from "uuid/v4";
import { gunStore } from "@Stores/gunStore";
import { writable } from "svelte/store";

function gameStoreGun(id) {
  // const store = gunStore("game", null);
  //
  // function newGame(user) {
  //   const game = {id: uuid};
  // }

  return {
    subscribe: store.subscribe,
  };
}
export const testStore = gunStore("test", 0);

const gameStore = writable({
  id: "sasdasd-asdasd-asdasd",
  players: [
    {
      name: "joycollector",
      money: 1000,
    },
    {
      name: "sshkalikov",
      money: 1000,
    },
    {
      name: "mario",
      money: 1000,
    },
    {
      name: "luigi",
      money: 1000,
    },
  ],
  stage: [
    {
      dealer: "joycollector",
      rounds: [
        {
          mario: {
            type: "pending",
            amount: 10,
          },
          luigi: {
            type: "pending",
            amount: 20,
          },
          sshkalikov: {
            type: "active",
            amount: 20,
          },
        },
      ],
      cards: {
        mario: ["A1", "K1"],
        luigi: ["T2", "T4"],
        sshkalikov: ["91", "Q1"],
      },
      table: ["74", "71", "72"],
    },
  ],
});
