<script>
	import Cell from './Cell.svelte';
	import { ss } from './shared.svelte';
</script>

<div class={ss.mobile ? 'board-m' : 'board'}>
	{#each ss.cells as cell, i (cell.id)}
		<Cell bind:cell={ss.cells[i]} />
	{/each}
</div>

<style>
	.board, .board-m {
		grid-area: 2/1;
		place-self: center;
		display: grid;
		place-content: center;
	}

	.board-m {
		scale: 0.9;
	}
</style>
