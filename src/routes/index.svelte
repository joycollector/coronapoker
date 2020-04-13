<script>
  import { newGame, joinGame, currentUserStore } from "@Stores/gameStore";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  const { sessionID } = $session;

  const currentUser = currentUserStore(sessionID);

  let username = $currentUser;
  let game;

  function openGame(gameId) {
    goto(`/games/${gameId}`);
  }

  function onNew() {
    const gameId = newGame(username, sessionID);
    openGame(gameId);
  }

  function onJoin() {
    const gameId = joinGame(username, game, sessionID);
    openGame(gameId);
  }
</script>

<style>

</style>

<svelte:head>
  <title>CoronaPoker</title>
</svelte:head>

<h1>CoronaPoker</h1>
<label for="name">Username</label>
<input name="name" bind:value={username} />
<div>
  <button on:click={onNew}>New Game</button>
</div>
<div>
  <label for="game">Game ID</label>
  <input name="game" bind:value={game} />
  <button on:click={onJoin}>Join Game</button>
</div>
