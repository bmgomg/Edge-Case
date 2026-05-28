<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { allGuessesEntered, persist, rowCol, someIncorrect, ss } from './shared.svelte';
	import { _range, post } from './utils';
	import { _sound } from './sound.svelte';
	import { COST_GUESS } from './const';

	const cell = $derived(ss.cells[ss.guessing - 1]);

	const onSelectValue = (n) => {
		cell.guess = n;
		cell.cost = cell.cost === undefined ? 0 : cell.cost + COST_GUESS;

		if (cell.cost) {
			_sound.play('coin1');
			ss.balance -= COST_GUESS;
		}

		delete cell.incorrect;
		delete ss.guessing;

		persist();

		if (allGuessesEntered() && !someIncorrect()) {
			post(() => _sound.play('won', { rate: 3 }), 400);
		}
	};

	const onClearValue = () => {
		delete cell.guess;
		delete cell.incorrect;
		delete ss.guessing;

		persist();
	};
</script>

{#if ss.guessing && !ss.over}
	<div class={ss.vert ? 'selector-v' : 'selector'} transition:fade={{ duration: 150 }}>
		{#each _range(1, 9) as n (n)}
			{@const { row, col } = rowCol(n - 1)}
			{@const style = `grid-area: ${row}/${col}; font-family: LB; width: 70px; height: 35px;`}
			<TextButton id={'tb-n' + n} text={[n]} framed onClick={() => onSelectValue(n)} {style} />
		{/each}
		{#if true}
			{@const style = 'width: 70px; height: 35px; font-size: 12px; letter-spacing: 0.12em;'}
			<TextButton id="tb-clear" text={['Clear']} framed onClick={onClearValue} {style} disabled={!ss.cells[ss.guessing - 1].guess} />
		{/if}
	</div>
{/if}

<style>
	.selector, .selector-v {
		grid-area: 3/1;
		place-self: center;
		display: grid;
		gap: 8px;
	}

	.selector-v {
		scale: 0.8;
	}
</style>
