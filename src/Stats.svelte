<script>
	import NumberFlow from '@number-flow/svelte';
	import { fade } from 'svelte/transition';
	import { aveScore, ss, stats } from './shared.svelte';
	import Money from './Money.svelte';
</script>

<div class={ss.mobile ? 'stats-m' : 'stats'}>
	<div class="item">
		<span class="label">PLAYS</span>
		<div class="value"><NumberFlow value={stats.plays} /></div>
	</div>
	{#snippet score(label, value, cents)}
		<div class="item">
			<span class="label">{label}</span>
			<div class="value {value < 0 ? 'red' : ''}" in:fade>
				<Money {value} {cents} />
			</div>
		</div>
	{/snippet}
	{@render score('AVERAGE', aveScore(), true)}
	{@render score('BEST', stats.best)}
</div>

<style>
	.stats, .stats-m {
		grid-area: 1/3;
		display: grid;
		grid: auto / 70px 90px 90px;
		grid-auto-flow: column;
		align-items: baseline;
		cursor: initial;
	}

	.stats-m {
		grid-area: 1/1;
		place-self: center;
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
		font-family: LB;
		font-size: 17px;
		opacity: 0.6;
		color: var(--gold-dim);
	}

	.red {
		opacity: 1;
		color: var(--red);
	}
</style>
