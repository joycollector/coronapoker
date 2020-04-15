<script>
    import { getSuitById } from "@Services/suits";

    export let card;
    export let className;

    let suit;
    $: suit = card[1] ? getSuitById(Number(card[1])) : null

    let value = card ? card[0] : null;
    let valueLabel = value === "T" ? 10 : value;
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

    .shirt {
        border-radius: 3px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAX0lEQVQoU2O8uPzmf/1IdUYGBgaGpZtu/o9u/MywtJ6XIdoPIgaTB3MIKQIpJmgS3ER81iE7i5HB+Mx/bG5Cdzsj2EQ0h2PzINwzMElcoYASBPiCipGQSTBnoZiILzwBXwuWB19HR+IAAAAASUVORK5CYII=) repeat;
        border: 1px solid #2d2a7d;
        display: flex;
        align-self: stretch;
        top: 3px;
        bottom: 3px;
        left: 3px;
        right: 3px;
    }

    .card > * {
        position: absolute;
    }

    .card > img {
        width: 20px;
        height: 20px;
        align-self: center;
    }

    .card > span:not(.shirt):first-child {
        top: 0;
        align-self: flex-start;
    }

    .card > span:not(.shirt):last-child {
        bottom: 0;
        align-self: flex-end;
    }
</style>
<span class="card {className}">
    {#if value}
        <span>{valueLabel}</span>
        <img src={`/${suit}.svg`} alt={suit}/>
        <span>{valueLabel}</span>
    {:else}
        <span class="shirt" />
    {/if}
</span>
