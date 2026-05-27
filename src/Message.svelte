<script>
	import { fade } from 'svelte/transition';
	import { aveScore, canSubmit, someIncorrect, ss, stats } from './shared.svelte';
	import { COST_GUESS, COST_BAD_SUBMIT } from './const';

	const showSubmitPenalty = $derived(canSubmit());

	const message = $derived.by(() => {
		if (ss.guessing) {
			return `Think twice — changing your mind costs $${COST_GUESS}`;
		}

		if (showSubmitPenalty) {
			return `Incorrect submission costs $${COST_BAD_SUBMIT}`;
		}

		if (ss.over === 'surrender') {
			return 'You gave up.';
		}

		if (ss.over === 'won') {
			if (stats.plays > 1) {
				if (stats.best === ss.balance) {
					return 'All correct — best score!';
				}

				if (aveScore() > ss.prevAverage) {
					return 'All correct — average improved!';
				}
			}

			return ss.balance < 0 ? 'All correct — but bank\'s broken.' : 'All correct!';
		}

		if (someIncorrect()) {
			return 'Bad guesses highlighted in red.';
		}

		return null;
	});
</script>

{#key message}
	<div class="message {ss.mobile ? 'mobile-scale' : ''}" in:fade={{ delay: 200 }} out:fade>{message}</div>
{/key}

<style>
	.message {
		grid-area: 1/1;
		place-self: center;
		z-index: 1;
		display: grid;
		font-size: 28px;
		letter-spacing: 0.04em;
		color: var(--gold-dim);
		font-family: CG;
		font-style: italic;
		width: 420px;
		text-align: center;
		line-height: 1;
	}
</style>
