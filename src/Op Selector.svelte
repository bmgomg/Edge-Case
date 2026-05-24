<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { COST_MULTIPLY, COST_ADD, COST_SUBTRACT, OP_MULTIPLY, OP_ADD, OP_SUBTRACT } from './const';
	import { opCost, ss } from './shared.svelte';

	const cell = $derived(ss.cells[ss.buyOp - 1]);
	const { row, col } = $derived(cell);

	const onApply = (op) => {
		cell.op = op;

		const c1 = ss.cells[cell.col - 1];
		const c2 = ss.cells[(cell.row - 1) * 5];

		cell.value = op === OP_MULTIPLY ? c1.value * c2.value : op === OP_ADD ? c1.value + c2.value : Math.abs(c1.value - c2.value);
		ss.balance -= opCost(op);

		delete ss.buyOp;
	};

	const canOp = (op) => {
		const cells = ss.cells.filter((c) => c !== cell && (c.row === row || c.col === col));
		return cells.every((c) => c.op !== op);
	};

	const style = 'width: 134px; height: 35px; font-size: 13.5px; letter-spacing: 0.1em;';
</script>

{#if ss.buyOp && !ss.over}
	<div class="selector" transition:fade={{ duration: 150 }}>
		<div class="multiply">
			<TextButton
				id="tb-multiply"
				text={[`Multiply • $${COST_MULTIPLY}`]}
				onClick={() => onApply(OP_MULTIPLY)}
				disabled={!canOp(OP_MULTIPLY)}
				framed
				{style}
			/>
		</div>
		<div class="add">
			<TextButton id="tb-add" text={[`Add • $${COST_ADD}`]} onClick={() => onApply(OP_ADD)} disabled={!canOp(OP_ADD)} framed {style} />
		</div>
		<div class="subtract">
			<TextButton
				id="tb-subtract"
				text={[`Subtract • $${COST_SUBTRACT}`]}
				onClick={() => onApply(OP_SUBTRACT)}
				disabled={!canOp(OP_SUBTRACT)}
				framed
				{style}
			/>
		</div>
	</div>
{/if}

<style>
	.selector {
		grid-area: 3/1;
		place-self: center;
		display: grid;
		grid-auto-flow: column;
		gap: 10px;
	}

	.multiply {
		filter: hue-rotate(-60deg);
	}

	.add {
		filter: hue-rotate(60deg);
	}

	.subtract {
		filter: hue-rotate(150deg);
	}
</style>
