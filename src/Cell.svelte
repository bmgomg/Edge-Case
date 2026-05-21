<script>
	import { rowCol } from './shared.svelte';
	import TextButton from './Text Button.svelte';

	const { id } = $props();
    const bid = $derived('tb-cell-' + id);
	const { row, col } = $derived(rowCol(id - 1));
	const unused = $derived(row === 1 && col === 1);
	const edge = $derived(!unused && (row === 1 || col === 1));
    const edgeStyle = 'font-family: RC; color: var(--water);';
    const unusedStyle = `${edgeStyle}`;
    const opStyle = 'font-family: RC; letter-spacing: 0; color: var(--gold-dim);';
</script>

<div class="cell {edge || unused ? 'edge' : ''}" style="grid-area: {row}/{col}">
	{#if edge}
        <TextButton id={bid} text={['guess', 'number']} style={edgeStyle}/>
	{:else if unused}
        <TextButton id={bid}  text={['reveal', 'unused', 'number']} style={unusedStyle}/>
	{:else}
        <TextButton id={bid}  text={['buy', 'operator']} style={opStyle}/>
	{/if}
</div>

<style>
	.cell {
		display: grid;
		width: 80px;
		aspect-ratio: 1;
		background: linear-gradient(180deg, #2c2d51 0%, #20223e 65%, #1e2039 85%, var(--deep-purple) 100%);
		border: 1px dotted #a07e36c0;
		box-sizing: border-box;
		margin: 2px;
		cursor: pointer;
		place-content: center;
	}

	.edge {
		background: var(--button-background);
        border: none;
	}
</style>
