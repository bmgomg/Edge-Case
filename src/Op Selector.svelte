<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { COST_MULTIPLY, COST_ADD, COST_SUBTRACT, OP_MULTIPLY, OP_ADD, OP_SUBTRACT } from './const';
	import { opCost, ss } from './shared.svelte';

	const cell = $derived(ss.cells[ss.buyOp - 1]);

	const onApply = (op) => {
		cell.op = op;

		const c1 = ss.cells[cell.col - 1];
		const c2 = ss.cells[(cell.row - 1) * 5];

		cell.value = op === OP_MULTIPLY ? c1.value * c2.value : op === OP_ADD ? c1.value + c2.value : Math.abs(c1.value - c2.value);
		ss.balance -= opCost(op);

		delete ss.buyOp;
	};

	const style = 'font-family: LB; width: 130px; height: 35px; font-size: 12px; letter-spacing: 0.12em;';
</script>

{#if ss.buyOp && !ss.over}
	<div class="selector" transition:fade={{ duration: 150 }}>
		<div class="multiply">
			<TextButton id="tb-multiply" text={[`Multiply   $${COST_MULTIPLY}`]} framed onClick={() => onApply(OP_MULTIPLY)} {style} />
		</div>
		<div class="add">
			<TextButton id="tb-add" text={[`Add   $${COST_ADD}`]} framed onClick={() => onApply(OP_ADD)} {style} />
		</div>
		<div class="subtract">
			<TextButton id="tb-subtract" text={[`Subtract   $${COST_SUBTRACT}`]} framed onClick={() => onApply(OP_SUBTRACT)} {style} />
		</div>
	</div>
{/if}

<style>
	.selector {
		grid-area: 1/1;
		place-self: end center;
		display: grid;
		grid-auto-flow: column;
		gap: 13px;
		margin: 30px 0;
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
