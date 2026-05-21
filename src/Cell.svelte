<script>
	import { rowCol } from './shared.svelte';

	const { id } = $props();
	const { row, col } = $derived(rowCol(id - 1));
</script>

<div class="cell" style="grid-area: {row}/{col};"></div>

<style>
	.cell {
		display: grid;
		width: 80px;
		aspect-ratio: 1;
		border: 1px dotted gray;
		box-sizing: border-box;
		margin: 2px;
	}
</style>
