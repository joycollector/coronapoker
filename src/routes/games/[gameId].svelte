<script>
    import { stores } from "@sapper/app";
    import { currentUserStore, playersStore } from "@Stores/gameStore";
    import { placePlayers } from "@Services/placement";

    const { page, session } = stores();
    const { gameId } = $page.params;
    const { sessionID } = $session;

    const currentUser = currentUserStore(sessionID);

    let playersStoreInstance;
    let players;
    $: {
        playersStoreInstance = playersStore(gameId);
        players = placePlayers(Object.entries($playersStoreInstance || [])
                .filter(([name]) => name !== "_")
                .map(([name, money]) => ({ name, money })));
    }
</script>
<style>
    .game {
        position: relative;
        display: grid;
        grid-template-areas:
            "player4 player5 player6"
            "player3 table player7"
            "player2 player1 player8";
        grid-template-columns: 60px 1fr 60px;
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
    }

    .player {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .avatar {
        border-radius: 30px;
        width: 60px;
        height: 60px;
    }
</style>

<div class="game">
    <div class="table">Corona Poker</div>
    {#each players as {name, money, place}}
        <div class="player" style="{`grid-area: ${place}`}">
            <img class="avatar" src={`https://api.adorable.io/avatars/60/${name}@adorable.io.png`} alt={name}/>
            {name}: {money}
        </div>
    {/each}
</div>

{JSON.stringify(sessionID)}



