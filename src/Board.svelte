<script>
	import Cell from './Cell.svelte';
	import { ss } from './shared.svelte';
</script>

<div class={ss.vert ? 'board-v' : 'board'}>
	{#each ss.cells as cell, i (cell.id)}
		<Cell bind:cell={ss.cells[i]} />
	{/each}
</div>

<style>
	.board, .board-v {
		grid-area: 2/1;
		place-self: center;
		display: grid;
		place-content: center;
	}

	.board-v {
		scale: 0.9;
	}
</style>
