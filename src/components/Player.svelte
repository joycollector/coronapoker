<script>
    import {stores} from "@sapper/app";
    import Card from "./Card.svelte";
    import {playerBetStore, currentUserStore, playerCardsStore} from "@Stores/gameStore";
    export let gameId;
    export let name;
    export let money;
    export let place;

    const {session} = stores();
    const {sessionID} = $session;

    const currentUser = currentUserStore(sessionID);
    const currentUserName = $currentUser;
    const bet = playerBetStore(gameId, name);
    const cards = playerCardsStore(gameId, name);
</script>
<style>
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

    .cards {
        position: relative;
        width: 70px;
        height: 80px;
    }

    div :global(.firstCard) {
        position: absolute !important;
        top: 0;
        left: 0;
    }

    div :global(.secondCard) {
        position: absolute !important;
        top: 20px;
        left: 30px;
    }
</style>
<div class="player" style="{`grid-area: ${place}`}">
    {#if true}
        <div class="cards">
            <Card card={$cards[0]} className="firstCard" />
            <Card card={$cards[1]} className="secondCard" />
        </div>
    {:else}
        <img class="avatar" src={`https://api.adorable.io/avatars/60/${name}@adorable.io.png`} alt={name}/>
    {/if}
    <div class="info">
        {name}: {money}
    </div>
    {#if $bet}
        <div class="bet">
            {$bet.type} / {$bet.amount}
        </div>
    {/if}
</div>
