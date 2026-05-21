<script>
	import { fade } from 'svelte/transition';
	import { aveScore, bankBalance, ss, stats } from './shared.svelte';

	const balance = $derived(bankBalance());

	const message = $derived.by(() => {
		if (ss.over === 'won') {
			if (stats.plays > 1) {
				if (stats.best === balance) {
					return 'Best score!';
				}

				if (aveScore() > ss.prevAverage) {
					return 'Average improved!';
				}
			}

			return balance < 0 ? 'Bank broken' : 'All decked out!';
		}

		if (ss.over === 'lost') {
			return 'Too much debt!';
		}

		return null;
	});
</script>

{#if message && !ss.home && !ss.gather}
	<div class="message {ss.over === 'lost' ? 'lost' : ''}" in:fade={{ delay: 500 }} out:fade>{message}</div>
{/if}

<style>
	.message {
		grid-area: 2/1;
		place-self: center;
		z-index: 1;
		display: grid;
		font-size: 20px;
		padding: 0.75rem 2rem;
		letter-spacing: 0.04em;
		background: var(--deep-purple);
		border-radius: 10px;
		border: 1px solid #f5f0e080;
		opacity: 0.95;
	}

	.lost {
		background: #a52222;
	}
</style>
