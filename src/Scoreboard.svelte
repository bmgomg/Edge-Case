<script>
	import Divider from './Divider.svelte';
	import Finances from './Finances.svelte';
	import { ss } from './shared.svelte';
	import Stats from './Stats.svelte';
</script>

<div class={ss.vert ? 'scoreboard-v' : 'scoreboard'}>
	<Finances />
	<Divider />
	<Stats />
</div>

<style>
	.scoreboard {
		grid-area: 1/1;
		place-self: center end;
		margin-right: 30px;
		display: grid;
		justify-items: center;
		gap: 50px;
	}
</style>
