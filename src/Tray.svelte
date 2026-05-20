<script>
	import Back from '$lib/images/Back.webp';
	import Cell from './Cell.svelte';
	import { CELL_HEIGHT, CELL_WIDTH } from './const';
	import { deckCodes, ss } from './shared.svelte';
</script>

<div id="tray" class="tray">
	{#if deckCodes().length}
		<img src={Back} alt="" width="{CELL_WIDTH}px;" height="{CELL_HEIGHT}px;" />
	{/if}
	<Cell cell={ss.trayCell || { code: 0, id: -1 }} />
</div>

<style>
	.tray {
		grid-area: 1/1;
		place-self: center start;
		margin-left: 160px;
		display: grid;
		z-index: 2;
		place-content: center;
		place-items: center;
		box-sizing: border-box;
		/* border: 2px solid var(--gold); */
		border-radius: 10px;
	}

	img {
		grid-area: 1/1;
	}
</style>
