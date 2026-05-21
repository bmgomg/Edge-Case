<script>
	import Cell from './Cell.svelte';
	import { _range } from './utils';
</script>

<div class="board">
	{#each _range(1, 25) as id (id)}
		<Cell {id} />
	{/each}
</div>

<style>
	.board {
		grid-area: 1/1;
		display: grid;
		place-content: center;
	}
</style>
