<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { COST_BAD_SUBMIT } from './const';
	import { canSubmit, edgeCells, isSolved, onOver, persist, ss } from './shared.svelte';
	import { _sound } from './sound.svelte';

	const ecells = $derived(edgeCells());

	const onDone = () => {
		if (isSolved()) {
			onOver('won');
			return;
		}

		_sound.play('lost');
		_sound.play('coins');
		ss.balance -= COST_BAD_SUBMIT;

		ecells.forEach((c) => {
			if (c.guess === c.value) {
				delete c.incorrect;
			} else {
				c.incorrect = true;
				ss.explainRed = true;
			}
		});

		persist();
	};

	const style = 'letter-spacing: 0.12em; font-size: 14px;';
</script>

{#if canSubmit()}
	<div class="prompt {ss.vert ? 'v-scale' : ''}" in:fade={{ delay: 500 }} out:fade>
		<TextButton id="tb-done" text={['Done — check my guesses']} framed onClick={onDone} {style} />
	</div>
{/if}

<style>
	.prompt {
		grid-area: 3/1;
		place-self: center;
		display: grid;
		grid-auto-flow: column;
		gap: 20px;
	}
</style>
