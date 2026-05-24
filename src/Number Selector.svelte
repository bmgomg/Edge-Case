<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { guessedAll, persist, rowCol, ss } from './shared.svelte';
	import { _range, post } from './utils';
	import { _sound } from './sound.svelte';

	const onSelectValue = (n) => {
		ss.cells[ss.guessing - 1].guess = n;
		delete ss.guessing;

		persist();

		if (guessedAll()) {
			post(() => _sound.play('won', { rate: 3 }), 400);
		}
	};

	const onClearValue = () => {
		delete ss.cells[ss.guessing - 1].guess;
		delete ss.guessing;
	};
</script>

{#if ss.guessing && !ss.over}
	<div class="selector" transition:fade={{ duration: 150 }}>
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
	.selector {
		grid-area: 3/1;
		place-self: center;
		display: grid;
		gap: 8px;
	}
</style>
