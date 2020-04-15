<script>
    import {stores} from "@sapper/app";
    import {playersStore} from "@Stores/gameStore";
    import {placePlayers} from "@Services/placement";
    import {getCards} from "@Services/pack";
    import Card from "@Components/Card.svelte";
    import Player from "../../components/Player.svelte";


    const {page, session} = stores();
    const {gameId} = $page.params;
    const {sessionID} = $session;

    const startNewGame = function() {
        fetch(`/api/games/${gameId}`, { method: "POST" });
    };

    let playersStoreInstance;
    let players;
    let deck = getCards(3, []);
    $: {
        playersStoreInstance = playersStore(gameId);
        players = placePlayers(Object.entries($playersStoreInstance || [])
                .filter(([name]) => name !== "_")
                .map(([name, money]) => ({name, money})));
    }
</script>
<style>
    .game {
        position: relative;
        display: grid;
        grid-template-areas: "player4 player5 player6" "player3 table player7" "player2 player1 player8";
        grid-template-columns: max-content 1fr max-content;
        grid-template-rows: max-content 400px max-content;
        height: 100%;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        align-content: center;
        margin: 20px
    }

    .table {
        border-radius: 50px;
        background-color: green;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        grid-area: table;
        flex-direction: column;
    }

    .cards {
        display: grid;
        grid-column-gap: 10px;
        grid-auto-flow: column;
    }
</style>

<div class="game">
    <div class="table">
        <div>Corona Poker</div>
        <button on:click={startNewGame}>START</button>
        <div class="cards">

        </div>
    </div>
    {#each players as {name, money, place}}
        <Player gameId={gameId} name={name} money={money} place={place} />
    {/each}
</div>

{JSON.stringify(sessionID)}



