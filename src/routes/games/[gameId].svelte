<script>
  import { stores } from "@sapper/app";
  import { playersStore } from "@Stores/gameStore";
  const { page, session } = stores();
  const { gameId } = $page.params;
  const { sessionID } = $session;

  let players;

  $: players = playersStore(gameId);
</script>

<div>{gameId}</div>
{JSON.stringify(sessionID)}
{#each Object.entries($players) as [name, money]}
  <div>{name}: {money}</div>
{/each}

