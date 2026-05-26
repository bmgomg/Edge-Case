<script>
	import Finances from './Finances.svelte';
	import Stats from './Stats.svelte';
</script>

<div class="scoreboard">
	<div class="title">Edge Case</div>
	<Finances />
	<Stats />
</div>

<style>
	.scoreboard {
		display: grid;
		align-items: center;
		grid-auto-flow: column;
		place-content: space-between;
		margin: 30px 40px 0 45px;
		padding-left: 15px;
		border: 0px solid rgba(160, 126, 54, 0.333);
		border-bottom-width: 0.666667px;
	}

	.title {
		display: grid;
		font-family: CG;
		font-style: italic;
		font-size: 40px;
		color: var(--gold-dim);
		text-shadow: 0px 3px 0px #000;
	}
</style>
