<script>
	import Finances from './Finances.svelte';
	import Stats from './Stats.svelte';
</script>

<div class="top-panel">
	<Finances />
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
</style>
