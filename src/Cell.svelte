<script>
	import { fade } from 'svelte/transition';
	import { opCost, ss } from './shared.svelte';
	import TextButton from './Text Button.svelte';
	import { COST_GUESS, COST_UNUSED } from './const';
	import NumberFlow from '@number-flow/svelte';
	import Money from './Money.svelte';

	const { cell } = $props();
	const { id, row, col, value, guess, incorrect, cost, op } = $derived(cell);
	const bid = $derived('tb-cell-' + id);
	const unused = $derived(row === 1 && col === 1);
	const edge = $derived(!unused && (row === 1 || col === 1));
	const buttonStyle = 'height: 78px; aspect-ratio: 1;';
	const edgeStyle = `${buttonStyle} font-family: RC; color: var(--water); line-height: 1.1;`;
	const unusedStyle = `${edgeStyle}`;
	const opStyle = `${buttonStyle} font-family: RC; letter-spacing: 0; color: var(--gold-dim);`;
	const pulse = $derived((unused && ss.buyUnused) || ss.guessing === id || ss.buyOp === id);

	const classes = $derived.by(() => {
		let cls = (ss.vert ? 'cell-v' : 'cell') + ' no-highlight';

		if (edge || unused) {
			cls += ' edge';

			if (ss.over) {
				cls += ' dance';
			}
		}

		if (ss.over || (unused && ss.showUnused) || op || (!unused && !edge && !canBuyOp())) {
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

		delete ss.guessing;
		delete ss.buyOp;
		delete ss.promptSurrender;

		ss.buyUnused = true;
	};

	const onGuess = () => {
		if (ss.guessing === id) {
			delete ss.guessing;
			return;
		}

		delete ss.buyUnused;
		delete ss.buyOp;
		delete ss.promptSurrender;

		ss.guessing = id;
	};

	const onBuyOp = () => {
		if (ss.buyOp === id) {
			delete ss.buyOp;
			return;
		}

		delete ss.buyUnused;
		delete ss.guessing;
		delete ss.promptSurrender;

		ss.buyOp = id;
	};

	const canBuyOp = () => {
		if (ss.over) {
			return false;
		}

		const cells1 = ss.cells.filter((c) => c.row === row && c.col > 1 && c.col !== col);
		const cells2 = ss.cells.filter((c) => c.col === col && c.row > 1 && c.row !== row);
		const cells = [...cells1, ...cells2].filter((c) => c.op);

		const set = new Set(cells.map((c) => c.op));
		return set.size < 3;
	};

	const guessLabel = () => {
		if (cost === 0 && !guess) {
			return ['guess', 'again', 'for $' + COST_GUESS];
		}

		return ['guess', 'number'];
	};
</script>

<div class={classes} style="grid-area: {row}/{col}">
	{#if edge}
		{#if cost}
			<div class="cost" transition:fade>
				<Money value={cost} />
			</div>
		{/if}
		{#if guess || ss.over}
			<div class="number {incorrect ? 'incorrect' : ''}" in:fade><NumberFlow value={ss.over ? value : guess} /></div>
		{/if}
		{#if !ss.over}
			<div class="guess {guess ? 'hidden' : ''}">
				<TextButton id={bid} text={guessLabel()} style={edgeStyle} onClick={onGuess} />
			</div>
		{/if}
	{:else if unused}
		{#if ss.showUnused || ss.over}
			{#if ss.showUnused}
				<span class="cost" transition:fade>{'$' + COST_UNUSED}</span>
			{/if}
			<span class="number" transition:fade>{value}</span>
		{:else if !ss.over}
			<div class="ga11" transition:fade>
				<TextButton id={bid} text={['reveal', 'unused', 'number', 'for $' + COST_UNUSED]} style={unusedStyle} onClick={onBuyUnused} />
			</div>
		{/if}
	{:else if op}
		<div class="op-content" transition:fade>
			<span class="cost">{'$' + opCost(op)}</span>
			<span class="number">{value}</span>
			<span class="op-result">{op}</span>
		</div>
	{:else if canBuyOp()}
		<div class="ga11" transition:fade>
			<TextButton id={bid} text={['buy', 'operator']} style={opStyle} onClick={onBuyOp} />
		</div>
	{/if}
</div>

<style>
	.cell,
	.cell-v {
		display: grid;
		height: 80px;
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
		/* transition: opacity 0.5s; */
	}

	.op-content {
		grid-area: 1/1;
		display: grid;
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

	.incorrect {
		color: firebrick;
		filter: hue-rotate(150deg) saturate(2);
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
		border: none;
	}

	.product {
		filter: hue-rotate(-60deg);
	}

	.sum {
		filter: hue-rotate(60deg);
	}

	.difference {
		filter: hue-rotate(150deg);
	}

	.dance {
		animation: pulse 0.2s 1s alternate 6 ease-in-out;
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
