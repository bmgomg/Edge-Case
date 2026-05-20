<script>
	import PresetPanel from './Preset Panel.svelte';
	import Message from './Message.svelte';
	import Prompt from './Prompt.svelte';
	import { ss } from './shared.svelte';
	import Table from './Table.svelte';
	import Toolbar from './Toolbar.svelte';
	import TopPanel from './Top Panel.svelte';

	const hidden = $derived(ss.home);
</script>

<div class="game-page {hidden ? 'hidden' : ''}">
	<TopPanel />
	<Table />
	<PresetPanel/>
	<Message />
	<Prompt />
	<Toolbar />
</div>

<style>
	.game-page {
		grid-area: 1/1;
		display: grid;
		grid: 120px 650px 40px / auto;
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
