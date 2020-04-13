<script>
    import { getSuitById } from "@Services/suits";

    export let card;

    let suit;
    $: suit = getSuitById(Number(card[1]))
</script>
<style>
    .card {
        height: 50px;
        width: 35px;
        border: 1px solid black;
        padding: 3px;
        background: white;
        color: black;
        border-radius: 5px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .card > * {
        position: absolute;
    }

    .card > img {
        width: 20px;
        height: 20px;
        align-self: center;
    }

    .card > span:first-child {
        top: 0;
        align-self: flex-start;
    }

    .card > span:last-child {
        bottom: 0;
        align-self: flex-end;
    }
</style>
<span class="card">
    <span>{card[0]}</span>
    <img src={`/${suit}.svg`} alt={suit}/>
    <span>{card[0]}</span>
</span>
