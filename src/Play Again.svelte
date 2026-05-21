<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { onRestart, ss } from './shared.svelte';
</script>

{#if ss.over}
	<div class="prompt" in:fade={{ delay: 1000 }}>
		<TextButton id="tb-play-again" text={['Play again?']} framed onClick={onRestart} />
	</div>
{/if}

<style>
	.prompt {
		grid-area: 1/1;
		place-self: end center;
		display: grid;
		margin: 30px 0;
		font-size: 20px;
	}
</style>
