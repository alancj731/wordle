<script>
    // import the letters saved in board object
    import { board, status } from "../store"
    // x, y position of cell
    export let x;
    export let y;
    $: letter = $board[x][y];
    $: result = $status[x][y];
</script>

<div class="cell {result}">
    {letter}
</div>

<style>
    .cell{
        width: 70px;
        height: 70px;
        color: white;
        background-color: var(--bg);
        margin: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 55px;
        border-radius: 5px;
    }
    .correct {
        background-color: var(--green);
    }

    .in {
        background-color: var(--red);
    }

    .wrong {
        background-color: var(--dark);
    }
</style>