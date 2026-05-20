<script>
	import Counters from './Counters.svelte';
	import Stats from './Stats.svelte';
</script>

<div class="panel">
	<Counters />
	<Stats />
</div>

<style>
	.panel {
		display: grid;
		align-items: center;
		margin: 40px;
	}
</style>
