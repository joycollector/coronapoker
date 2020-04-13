import { gun } from "@Services/gun";

import { writable } from "svelte/store";

export function gunStore(name, def) {
  let current = def;
  const localStore = writable(current);

  localStore.subscribe((data) => (current = data));

  gun
    .get(name)
    .get("value")
    .on((data) => data.value !== current && localStore.set(data));

  function set(value) {
    gun.get(name).get("value").put(value);
    return localStore.set(value);
  }

  return { subscribe: localStore.subscribe, set };
}
