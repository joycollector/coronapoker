import { v4 as uuid } from "uuid";
import { gun } from "@Services/gun";
import { writable } from "svelte/store";

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
