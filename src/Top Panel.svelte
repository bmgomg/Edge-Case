<script>
	import Counters from './Counters.svelte';
	import Stats from './Stats.svelte';
</script>

<div class="top-panel">
	<div class="title">Edge Case</div>
	<Counters />
	<Stats />
</div>

<style>
	.top-panel {
		display: grid;
		align-items: center;
		grid-auto-flow: column;
		place-content: center;
		gap: 80px;
		margin: 30px 40px 0 45px;
		border: 0px solid rgba(160, 126, 54, 0.333);
		border-bottom-width: 0.666667px;
	}

	.title {
		font-family: LBI;
		font-size: 48px;
		line-height: 0.9;
		color: rgb(214, 178, 100);
		margin-left: 20px;
		text-shadow: 0 3px 0 #000;
	}
</style>
