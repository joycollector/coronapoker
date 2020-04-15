import { v4 as uuid } from "uuid";
import { gun } from "@Services/gun";
import { readable, writable } from "svelte/store";

function getSessionUser(sessionId) {
  return gun.get("sessions").get(sessionId);
}

function getGame(id) {
  return gun.get("games").get(id);
}

function getPlayers(id) {
  return gun.get("games").get(id).get("players");
}

export function playersStore(id) {
  const players = getPlayers(id);
  const localStore = writable({}, () => {
    players.on((data) => {
      localStore.set(data);
    });
    return () => {
      // players.off();
    };
  });
  players.once((data) => {
    localStore.set(data);
  });
  return {
    subscribe: localStore.subscribe,
  };
}

function readonlyStore(gunObject) {
  const { subscribe } = readable({}, (set) => {
    gunObject.on(set);
  });
  return {
    subscribe,
  };
}

export function playerBetStore(gameId, username) {
  return readonlyStore(getGame(gameId).get("stage").get("round").get(username));
}
export function playerCardsStore(gameId, username) {
  return readonlyStore(getGame(gameId).get("stage").get("cards").get(username));
}

export function currentUserStore(sessionId) {
  const localStore = writable("", () => {
    getSessionUser(sessionId).on((data) => localStore.set(data));
    return () => {
      // getSessionUser(sessionId).off();
    };
  });

  return {
    subscribe: localStore.subscribe,
  };
}

export function newGame(name, sessionId) {
  const newGameId = uuid();
  getPlayers(newGameId).put({ [name]: 1000 });
  getSessionUser(sessionId).put(name);
  return newGameId;
}

export function joinGame(name, id, sessionId) {
  getPlayers(id).put({ [name]: 1000 });
  getSessionUser(sessionId).put(name);
  return id;
}
