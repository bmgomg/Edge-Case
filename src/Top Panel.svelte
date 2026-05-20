<script>
	import Counters from './Counters.svelte';
	import Stats from './Stats.svelte';
</script>

<div class="panel">
	<div class="title">Edge Case</div>
	<Counters />
	<Stats />
</div>

<style>
	.panel {
		display: grid;
		align-items: center;
		margin: 30px 40px 0 45px;
		border: 0px solid rgba(160, 126, 54, 0.333);
		border-bottom-width: 0.666667px;
	}

	.title {
		grid-area: 1/1;
		place-self: center start;
		font-family: BMI;
		font-style: italic;
		font-size: 48px;
		line-height: 0.9;
		color: rgb(214, 178, 100);
		/* letter-spacing: -2px; */
		margin-left: 20px;
		text-shadow: rgba(0, 0, 0, 0.4) 0px 2px 0px;
	}
</style>
