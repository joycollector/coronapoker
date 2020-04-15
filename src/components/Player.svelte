<script>
    import ROUND_TYPES from "@Utils/roundTypes";
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
        position: relative;
        width: 180px;
        height: 110px;
        font-family: Helvetica;
        align-self: center;
        justify-self: center;
    }

    .avatar {
        border-radius: 50%;
        border: 3px solid #333333;
        width: 60px;
        height: 60px;
        z-index: 1;
        position: absolute;
        bottom: 35px;
        left: 10px;
    }

    .active {
        box-shadow: 0px -4px 10px 3px rgb(0, 173, 20);
    }

    .info {
        padding: 5px 15px;
        border-radius: 15px;
        background: #333333;
        color: #efefef;
        position: absolute;
        bottom: 0;
        width: 150px;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }

    .name {
        font-size: 16px;
        font-weight: bold;
        margin-right: 15px;
    }

    .money {
        font-size: 12px;
    }

    .status {
        position: absolute;
        top: 25px;
        left: 90px;
        font-size: 14px;
        font-weight: bold
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
        <img class="avatar" class:active={$bet && $bet.type === ROUND_TYPES.ACTIVE} src={`https://api.adorable.io/avatars/60/${name}@adorable.io.png`} alt={name}/>
    {/if}
    <div class="info" class:active={$bet && $bet.type === ROUND_TYPES.ACTIVE} >
        <span class="name">{name}</span> <span class="money">€{money}</span>
    </div>
    {#if $bet}
        <div class="status">
            {#if $bet}
                bet: {$bet.amount}
            {/if}
        </div>
    {/if}
</div>
