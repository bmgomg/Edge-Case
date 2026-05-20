<script>
	import NumberFlow from '@number-flow/svelte';
	import { fade } from 'svelte/transition';
	import { aveScore, stats } from './shared.svelte';
	import Money from './Money.svelte';
</script>

<div class="stats">
	<div class="item">
		<span class="label">PLAYS</span>
		<div class="value"><NumberFlow value={stats.plays} /></div>
	</div>
	<div class="item">
		<span class="label">SOLVED</span>
		<div class="value"><NumberFlow value={stats.solved} /></div>
	</div>
	{#snippet score(label, value)}
		<div class="item">
			<span class="label">{label}</span>
			<div class="value {value < 0 ? 'red' : ''}" in:fade>
				<Money {value} />
			</div>
		</div>
	{/snippet}
	{@render score('AVERAGE', aveScore())}
	{@render score('BEST', stats.best)}
</div>

<style>
	.stats {
		display: grid;
		grid: auto / 70px 90px 90px 90px;
		grid-auto-flow: column;
		align-items: baseline;
		cursor: initial;
	}

	.item {
		display: grid;
		place-items: center;
		gap: 3px;
	}

	.label {
		color: var(--subtitle);
		letter-spacing: 0.22em;
		font-size: 13px;
	}

	.value {
		font-family: BM;
		font-size: 17px;
		opacity: 0.6;
	}

	.red {
		opacity: 1;
		color: var(--red);
	}
</style>
