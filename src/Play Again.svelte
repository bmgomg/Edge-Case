<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { onRestart, ss } from './shared.svelte';
</script>

{#if ss.over}
	<div class="prompt {ss.vert ? 'v-scale' : ''}" in:fade={{ delay: 1000 }}>
		<TextButton id="tb-play-again" text={['Play again?']} framed onClick={onRestart} style="letter-spacing: 0.12em;" />
	</div>
{/if}

<style>
	.prompt {
		grid-area: 3/1;
		place-self: center;
		display: grid;
		font-size: 20px;
	}
</style>
