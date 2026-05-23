<script>
	import { fade } from 'svelte/transition';
	import { opCost, ss } from './shared.svelte';
	import TextButton from './Text Button.svelte';
	import { COST_UNUSED } from './const';

	const { cell } = $props();
	const { id, row, col, value, guess, op } = $derived(cell);
	const bid = $derived('tb-cell-' + id);
	const unused = $derived(row === 1 && col === 1);
	const edge = $derived(!unused && (row === 1 || col === 1));
	const buttonStyle = 'height: 78px; aspect-ratio: 1;';
	const edgeStyle = `${buttonStyle} font-family: RC; color: var(--water);`;
	const unusedStyle = `${edgeStyle}`;
	const opStyle = `${buttonStyle} font-family: RC; letter-spacing: 0; color: var(--gold-dim);`;
	const pulse = $derived((unused && ss.buyUnused) || ss.guess === id || ss.buyOp === id);

	const classes = $derived.by(() => {
		let cls = 'cell';

		if (edge || unused ? 'edge' : '') {
			cls += ' edge';
		}

		if (ss.over || (unused && ss.showUnused) || op || !canOp()) {
			cls += ' nope';
		}

		if (pulse) {
			cls += ' pulse';
		}

		if (op) {
			cls += ' op ' + op;
		}

		return cls;
	});

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
		if (ss.buyOp === id) {
			delete ss.buyOp;
			return;
		}

		delete ss.buyUnused;
		delete ss.guess;

		ss.buyOp = id;
	};

	const canOp = () => {
		let cells = ss.cells.filter((c) => c.row === row && c.col > 1 && c.col !== col);
		cells = cells.filter((c) => c.op);

		if (cells.length === 3) {
			return false;
		}

		cells = ss.cells.filter((c) => c.col === col && c.row > 1 && c.row !== row);
		cells = cells.filter((c) => c.op);

		if (cells.length === 3) {
			return false;
		}

		return true;
	};
</script>

<div class={classes} style="grid-area: {row}/{col}">
	{#if edge}
		{#if guess}
			<span class="number" in:fade>{guess}</span>
		{/if}
		{#if true}
			<div class="guess {guess ? 'hidden' : ''}" in:fade>
				<TextButton id={bid} text={['guess', 'number']} style={edgeStyle} onClick={onGuess} />
			</div>
		{/if}
	{:else if unused}
		{#if ss.showUnused}
			<span class="cost" in:fade>{'$' + COST_UNUSED}</span>
			<span class="number" in:fade>{value}</span>
		{:else}
			<div in:fade>
				<TextButton id={bid} text={['reveal', 'unused', 'number']} style={unusedStyle} onClick={onBuyUnused} />
			</div>
		{/if}
	{:else if op}
		<div class="op-content" in:fade>
			<span class="cost">{'$' + opCost(op)}</span>
			<span class="number">{value}</span>
			<span class="op-result">{op}</span>
		</div>
	{:else if canOp()}
		<div class="buy-op-button" out:fade>
			<TextButton id={bid} text={['buy', 'operator']} style={opStyle} onClick={onBuyOp} />
		</div>
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

	.op-content {
		grid-area: 1/1;
		display: grid;
	}

	.buy-op-button {
		grid-area: 1/1;
	}

	.hidden {
		opacity: 0;
	}

	.number {
		grid-area: 1/1;
		place-self: center;
		font-family: LB;
		font-size: 32px;
		font-weight: bold;
		color: var(--water);
	}

	.cost {
		grid-area: 1/1;
		place-self: center;
		font-family: LB;
		font-size: 14px;
		color: var(--water);
		translate: -23px -26px;
	}

	.op-result {
		grid-area: 1/1;
		place-self: center;
		translate: 0 25px;
	}

	.op {
		background: var(--button-background);
		color: var(--water);
		font-size: 12px;
		font-weight: 500;
	}

	.product {
		filter: hue-rotate(-60deg);
	}

	.sum {
		filter: hue-rotate(60deg);
	}

	.delta {
		filter: hue-rotate(150deg);
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
