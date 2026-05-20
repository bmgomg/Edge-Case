<script>
	import Counters from './Counters.svelte';
	import DeckCounter from './Deck Counter.svelte';
	import Stats from './Stats.svelte';
	import Tray from './Tray.svelte';
</script>

<div class="panel">
	<DeckCounter />
	<Tray />
	<Counters />
	<Stats />
</div>

<style>
	.panel {
		display: grid;
		align-items: center;
		z-index: 1;
	}
</style>
