<script>
    import { GAME_WORD, board, createGrid, gameInfo, gameOver, guess, status, words_list } from "../store";

    const playAgain = () =>{
        GAME_WORD.set(words_list[Math.floor(Math.random() * words_list.length)])
        // console.log('new GAME_WORD:' + GAME_WORD)
        board.set(createGrid())
        gameInfo.set( {rowindex:0, colindex:0} )
        status.set(createGrid())
        guess.set([]);
        gameOver.set(false);
    }
</script>

<div class="center">
    <h3>The correct word is <strong>{$GAME_WORD}</strong></h3>
    <h3>You guesses are:</h3>
    {#each $guess as guessedWord}
        <h4><strong>{guessedWord}</strong></h4>
    {/each}
</div>

<div class="center">
    <button on:click={playAgain}>
        Play Again?
    </button>
</div>

<style>
    strong{
        font-weight: 900;
    }

    h3 {
        font-size: 2em;
        margin-top: 60px;
        margin-bottom: 20px;
    }

    h4 {
        font-size: 1.8em;
        margin: 15px;
    }

    button {
        background-color: forestgreen;
        columns: white;
        margin: 20px;
        padding: 20px 50px;

    }

    .center {
        margin: 20px auto;
        width: fit-content;
        text-align: center;
    }
</style>