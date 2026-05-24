<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { guessedAll, isSolved, onOver, ss } from './shared.svelte';

	const onDone = () => {
		onOver(isSolved() ? 'won' : 'lost');
	};

	const style = 'letter-spacing: 0.12em; font-size: 14px;';
</script>

{#if guessedAll() && !ss.over && !ss.buyUnused && !ss.buyOp && !ss.guess}
	<div class="prompt" transition:fade={{ duration: 150 }}>
		<TextButton id="tb-done" text={['Done — check my guesses']} framed onClick={onDone} {style} />
	</div>
{/if}

<style>
	.prompt {
		grid-area: 31;
		place-self: center;
		display: grid;
		grid-auto-flow: column;
		gap: 20px;
	}
</style>
