<script>
	import Divider from './Divider.svelte';
	import Finances from './Finances.svelte';
	import { ss } from './shared.svelte';
	import Stats from './Stats.svelte';
</script>

<div class={ss.vert ? 'scoreboard-v' : 'scoreboard'}>
	<Finances />
	<div class="divider">
		<Divider />
	</div>
	<Stats />
</div>

<style>
	.scoreboard {
		grid-area: 1/1;
		place-self: center end;
		margin-right: 33px;
		display: grid;
		justify-items: center;
		gap: 50px;
	}

	.scoreboard-v {
		display: grid;
		align-items: center;
		place-content: space-between;
		padding-left: 15px;
		border-bottom-width: 0.666667px;
		grid-auto-flow: initial;
		padding: 0;
		border: none;
		place-self: center;
		margin: 40px 0 0;
	}

	.divider {
		grid-area: 2/1;
		margin: 15px auto 15px;
	}
</style>
