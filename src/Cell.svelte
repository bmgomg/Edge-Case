<script>
	import { fade } from 'svelte/transition';
	import { ss } from './shared.svelte';
	import TextButton from './Text Button.svelte';

	const { cell } = $props();
	const { id, row, col, value, guess } = $derived(cell);
	const bid = $derived('tb-cell-' + id);
	const unused = $derived(row === 1 && col === 1);
	const edge = $derived(!unused && (row === 1 || col === 1));
	const buttonStyle = 'height: 78px; aspect-ratio: 1;';
	const edgeStyle = `${buttonStyle} font-family: RC; color: var(--water);`;
	const unusedStyle = `${edgeStyle}`;
	const opStyle = `${buttonStyle} font-family: RC; letter-spacing: 0; color: var(--gold-dim);`;
	const clases = $derived(`cell ${edge || unused ? 'edge' : ''} ${unused && (ss.showUnused || ss.buyUnused) ? 'nope' : ''}`);

	const onBuyUnused = () => {
		ss.buyUnused = true;
	};

	const onGuess = () => {
		ss.guess = true;
	};

	const onBuyOp = () => {
		ss.buyOp = true;
	};
</script>

<div class={clases} style="grid-area: {row}/{col}">
	{#if edge}
		{#if guess}
			<span class="number" in:fade>{guess}</span>
		{:else}
			<div in:fade>
				<TextButton id={bid} text={['guess', 'number']} style={edgeStyle} onClick={onGuess} />
			</div>
		{/if}
	{:else if unused}
		{#if ss.showUnused}
			<span class="number nope" in:fade>{value}</span>
		{:else}
			<div in:fade>
				<TextButton id={bid} text={['reveal', 'unused', 'number']} style={unusedStyle} onClick={onBuyUnused}/>
			</div>
		{/if}
	{:else}
		<TextButton id={bid} text={['buy', 'operator']} style={opStyle} onClick={onBuyOp} />
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
		filter: hue-rotate(-150deg) saturate(0.5);
		border: none;
	}

	.number {
		font-family: BM;
		font-size: 32px;
		font-weight: bold;
		color: var(--water);
	}
</style>
