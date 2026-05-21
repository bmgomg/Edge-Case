<script>
	import { fade } from 'svelte/transition';
	import { ss } from './shared.svelte';
	import TextButton from './Text Button.svelte';

	const { cell } = $props();
	const { id, row, col, value, guess, op } = $derived(cell);
	const bid = $derived('tb-cell-' + id);
	const unused = $derived(row === 1 && col === 1);
	const edge = $derived(!unused && (row === 1 || col === 1));
	const opCell = $derived(!unused && !edge);
	const buttonStyle = 'height: 78px; aspect-ratio: 1;';
	const edgeStyle = `${buttonStyle} font-family: RC; color: var(--water);`;
	const unusedStyle = `${edgeStyle}`;
	const opStyle = `${buttonStyle} font-family: RC; letter-spacing: 0; color: var(--gold-dim);`;
	const pulse = $derived((unused && ss.buyUnused) || ss.guess === id || ss.buyOp === id);

	const classes = $derived(
		`cell ${edge || unused ? 'edge' : ''} ${ss.over || (unused && ss.showUnused) || (opCell && op) ? 'nope' : ''} ${pulse ? 'pulse' : ''}`
	);

	const onBuyUnused = () => {
		if (ss.buyUnused) {
			delete ss.buyUnused;
			return;
		}

		delete ss.guess;
		delete ss.buyOp;

		ss.buyUnused = true;
	};

	const onGuess = () => {
		if (ss.guess === id) {
			delete ss.guess;
			return;
		}

		delete ss.buyUnused;
		delete ss.buyOp;

		ss.guess = id;
	};

	const onBuyOp = () => {
		if (ss.buyOpp === id) {
			delete ss.buyOp;
			return;
		}

		delete ss.buyUnused;
		delete ss.guess;

		ss.buyOp = id;
	};
</script>

<div class={classes} style="grid-area: {row}/{col}">
	{#if edge}
		{#if guess}
			<span class="number" in:fade>{guess}</span>
		{/if}
		{#if true}
			<div class='guess {guess ? 'hidden' : ''}' in:fade>
				<TextButton id={bid} text={['guess', 'number']} style={edgeStyle} onClick={onGuess} />
			</div>
		{/if}
	{:else if unused}
		{#if ss.showUnused}
			<span class="number nope" in:fade>{value}</span>
		{:else}
			<div in:fade>
				<TextButton id={bid} text={['reveal', 'unused', 'number']} style={unusedStyle} onClick={onBuyUnused} />
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

	.guess {
		grid-area: 1/1;
		transition: opacity 0.5s;
	}

	.hidden {
		opacity: 0;
	}

	.number {
		grid-area: 1/1;
		place-self: center;
		font-family: BM;
		font-size: 32px;
		font-weight: bold;
		color: var(--water);
	}

	.pulse {
		animation: pulse 0.2s alternate infinite ease-in-out;
	}

	@keyframes pulse {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(0.9);
		}
	}
</style>
