<script>
  import Keyboards from "./Components/Keyboards.svelte";
  import Board from "./Components/Board.svelte";
  import { gameOver } from "./store";
  import GameOver from "./Components/GameOver.svelte";
  import { fade } from "svelte/transition";

</script>

<main>
	<nav>Wordle Clone</nav>
	{#if $gameOver}
		<GameOver />
	{:else}
		<div in:fade={{duration:800}}>
			<Board />
			<Keyboards />
		</div>
	{/if}


</main>

<style>
	nav {
		background-color: var(--bg);
		color: white;
		font-weight: bold;
		padding: 15px;
		font-size: 2em;
		text-align: center;
	}
</style>