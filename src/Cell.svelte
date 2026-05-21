<script>
	import { rowCol } from './shared.svelte';

	const { id } = $props();
	const { row, col } = $derived(rowCol(id - 1));
	const unused = $derived(row === 1 && col === 1);
	const edge = $derived(!unused && (row === 1 || col === 1));
</script>

<div class="cell {edge || unused ? 'edge' : ''}" style="grid-area: {row}/{col}">
	{#if edge}
		<span class="text edge-text">guess number</span>
	{:else if unused}
		<span class="text edge-text">reveal unused number</span>
	{:else}
		<span class="text">buy operator</span>
	{/if}
</div>

<style>
	.cell {
		display: grid;
		width: 80px;
		aspect-ratio: 1;
		background: var(--deep-purple);
		background: linear-gradient(180deg, #2c2d51 0%, #20223e 65%, #1e2039 85%, var(--deep-purple) 100%);
		border: 1px dotted #a07e36c0;
		box-sizing: border-box;
		margin: 2px;
		cursor: pointer;
		place-content: center;
	}

	.text {
		font-family: RC;
		font-size: 17px;
		text-align: center;
		line-height: 1.1;
		color: var(--gold-dim);
		opacity: 0.5;
		font-weight: 100;
	}

	.edge {
		background: var(--button-background);
        border: none;
	}

    .edge-text {
		color: var(--deep-purple);
		opacity: 1;
    }
</style>
