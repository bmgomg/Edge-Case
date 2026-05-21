<script>
	import { ss } from './shared.svelte';
	import TextButton from './Text Button.svelte';

	const { cell } = $props();
	const { id, row, col, secret, guess } = $derived(cell);
	const bid = $derived('tb-cell-' + id);
	const unused = $derived(row === 1 && col === 1);
	const edge = $derived(!unused && (row === 1 || col === 1));
	const buttonStyle = 'height: 78px; aspect-ratio: 1;';
	const edgeStyle = `${buttonStyle} font-family: RC; color: var(--water);`;
	const unusedStyle = `${edgeStyle}`;
	const opStyle = `${buttonStyle} font-family: RC; letter-spacing: 0; color: var(--gold-dim);`;
</script>

<div class="cell {edge || unused ? 'edge' : ''} {unused && ss.showUnused ? 'nope' :''}" style="grid-area: {row}/{col}">
	{#if edge}
		{#if guess}
			<span class="number">{guess}</span>
		{:else}
			<TextButton id={bid} text={['guess', 'number']} style={edgeStyle} />
		{/if}
	{:else if unused}
		{#if ss.showUnused}
			<span class="number nope">{secret}</span>
		{:else}
			<TextButton id={bid} text={['reveal', 'unused', 'number']} style={unusedStyle} />
		{/if}
	{:else}
		<TextButton id={bid} text={['buy', 'operator']} style={opStyle} />
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

	.number {
		font-family: BM;
		font-size: 32px;
		font-weight: bold;
		color: var(--water);
	}
</style>
