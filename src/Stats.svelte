<script>
	import NumberFlow from '@number-flow/svelte';
	import { fade } from 'svelte/transition';
	import { aveScore, ss, stats } from './shared.svelte';
	import Money from './Money.svelte';

	const classes = $derived(ss.mobile ? 'item-m' : 'item');
</script>

<div class={ss.mobile ? 'stats-m mobile-scale' : 'stats'}>
	<div class={classes}>
		<span class="label">PLAYS</span>
		<div class="value"><NumberFlow value={stats.plays} /></div>
	</div>
	{#snippet score(label, value, cents)}
		<div class={classes}>
			<span class="label">{label}</span>
			<div class="value {value < 0 ? 'red' : ''}" in:fade>
				<Money {value} {cents} />
			</div>
		</div>
	{/snippet}
	{@render score(ss.mobile ? 'AVE' : 'AVERAGE', aveScore(), true)}
	{@render score('BEST', stats.best)}
</div>

<style>
	.stats,
	.stats-m {
		grid-area: 1/3;
		display: grid;
		grid: auto / 70px 90px 90px;
		grid-auto-flow: column;
		align-items: baseline;
		cursor: initial;
	}

	.stats-m {
		grid-area: 1/1;
		grid: auto/auto;
		grid-auto-flow: column;
		place-self: center;
		gap: 25px;
	}

	.item,
	.item-m {
		display: grid;
		place-items: center;
		gap: 3px;
	}

	.item-m {
		grid-auto-flow: column;
		gap: 10px;
		align-items: center;
	}

	.label {
		color: var(--subtitle);
		letter-spacing: 0.22em;
		font-size: 17px;
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
