<script>
	import Cell from './Cell.svelte';
	import { ss } from './shared.svelte';
</script>

<div class="board">
	{#each ss.cells as cell, i (cell.id)}
		<Cell bind:cell={ss.cells[i]} />
	{/each}
</div>

<style>
	.board {
		grid-area: 2/1;
		place-self: center;
		display: grid;
		place-content: center;
	}
</style>
