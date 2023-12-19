<script>
    import { board } from "../store"
    import Cell from "./Cell.svelte"
</script>

<div class="game-board">
    {#each $board as row, x}
        <div class="row">
            {#each row as position, y}
                <Cell x={x} y={y} />
            {/each}
        </div>
    {/each}
</div>

<style>
    .game-board{
        margin: 50px auto;
        width: fit-content;
    }
    .row{
        display: flex;
    }
</style>