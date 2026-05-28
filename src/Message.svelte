<script>
	import { fade } from 'svelte/transition';
	import { COST_BAD_SUBMIT, COST_GUESS } from './const';
	import { aveScore, canSubmit, someIncorrect, ss, stats } from './shared.svelte';

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

			return ss.balance < 0 ? "All correct — but bank's broken." : 'All correct!';
		}

		if (someIncorrect()) {
			return 'Incorrect guesses highlighted in red.';
		}

		if (!ss.showUnused) {
			return 'Revealing the unused number adds its value to your bank.';
		}

		return null;
	});
</script>

{#key message}
	{@const long = message?.length > 40}
	{@const classes = ss.vert ? 'message-v ' + (long ? 'long-v' : '') : 'message ' + (long ? 'long' : '')}
	<div class={classes} in:fade={{ delay: 200 }} out:fade>
		{message}
	</div>
{/key}

<style>
	.message,
	.message-v {
		grid-area: 1/1;
		place-self: center;
		z-index: 1;
		display: grid;
		font-size: 26px;
		letter-spacing: 0.04em;
		color: var(--bone-dim);
		font-family: CG;
		font-style: italic;
		width: 420px;
		text-align: center;
		line-height: 1;
	}

	.message-v {
		width: 360px;
		font-size: 22px;
	}

	.long {
		font-size: 22px;
	}

	.long-v {
		font-size: 19px;
	}
</style>
