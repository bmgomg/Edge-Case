<script>
	import Playground from './Playground.svelte';
	import { ss } from './shared.svelte';
	import Toolbar from './Toolbar.svelte';
	import Scoreboard from './Scoreboard.svelte';
	import { fade } from 'svelte/transition';

	const hidden = $derived(ss.home);
</script>

{#if ss.cells}
	<div class="game-page {hidden ? 'hidden' : ''}" in:fade>
		<!-- <Scoreboard /> -->
		<Playground />
		<!-- <Toolbar /> -->
	</div>
{/if}

<style>
	.game-page {
		grid-area: 1/1;
		display: grid;
		/* grid: auto 1fr auto / auto; */
		width: 100%;
		transition: opacity 0.2s;
		box-sizing: border-box;
		user-select: none;
		padding: 35px;
	}

	.hidden {
		opacity: 0;
		pointer-events: none;
	}
</style>
