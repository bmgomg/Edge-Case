<script>
	import MidPanel from './Mid Panel.svelte';
	import { ss } from './shared.svelte';
	import Toolbar from './Toolbar.svelte';
	import TopPanel from './Top Panel.svelte';

	const hidden = $derived(ss.home);
</script>

<div class="game-page {hidden ? 'hidden' : ''}">
	<TopPanel />
	<MidPanel />
	<Toolbar />
</div>

<style>
	.game-page {
		grid-area: 1/1;
		display: grid;
		grid: auto 1fr auto / auto;
		width: 100%;
		transition: opacity 0.2s;
		box-sizing: border-box;
		user-select: none;
	}

	.hidden {
		opacity: 0;
		pointer-events: none;
	}
</style>
