<script>
	import NumberFlow from '@number-flow/svelte';
	import { fade } from 'svelte/transition';
	import { aveScore, ss, stats } from './shared.svelte';
	import Money from './Money.svelte';

	const classes = $derived(ss.vert ? 'item-v' : 'item');
</script>

<div class={ss.vert ? 'stats-v v-scale' : 'stats'}>
	{#snippet score(label, value, cents)}
		<div class={classes}>
			<span class="label {ss.vert ? 'label-v' : 'label'}">{label}</span>
			<div class="value {value < 0 ? 'red' : ''}" in:fade>
				{#if label === 'plays'}
					<NumberFlow value={stats.plays} />
				{:else}
					<Money {value} {cents} />
				{/if}
			</div>
		</div>
	{/snippet}
	{@render score('plays', stats.plays)}
	{@render score(ss.vert ? 'ave' : 'average', aveScore(), true)}
	{@render score('best', stats.best)}
</div>

<style>
	.stats {
		display: grid;
		cursor: initial;
		gap: 15px;
	}

	.item {
		display: grid;
		place-items: center;
		gap: 3px;
	}

	.label {
		color: var(--subtitle);
		letter-spacing: 0.22em;
		font-size: 17px;
		text-transform: uppercase;
	}

	.stats-v {
		display: grid;
		align-items: baseline;
		cursor: initial;
		grid-area: 1/1;
		grid: auto/auto;
		grid-auto-flow: column;
		place-self: center;
		gap: 30px;
	}

	.item-v {
		display: grid;
		place-items: center;
		grid-auto-flow: column;
		gap: 10px;
		align-items: center;
	}

	.label-v {
		color: var(--subtitle);
		font-size: 17px;
		text-transform: uppercase;
		letter-spacing: normal;
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
