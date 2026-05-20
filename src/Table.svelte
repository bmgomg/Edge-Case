<script>
	import Cell from './Cell.svelte';
	import { TABLE_MARGIN } from './const';
	import { ss } from './shared.svelte';
	import { _range } from './utils';
</script>

<div class="table {ss.gather || ss.spread ? 'on-top' : ''}" style="margin: 0 ${TABLE_MARGIN}px;">
	{#each _range(1, ss.cellCount) as i (i)}
		<Cell cell={ss.cells ? ss.cells[i - 1] : { code: 0, id: i + 1 }} />
	{/each}
</div>

<style>
	.table {
		grid-area: 2/1;
		display: grid;
		place-content: center;
	}

	.on-top {
		z-index: 2;
	}
</style>
