<script>
	import Divider from './Divider.svelte';
	import Finances from './Finances.svelte';
	import { ss } from './shared.svelte';
	import Stats from './Stats.svelte';
</script>

<div class={ss.mobile ? 'scoreboard-m' : 'scoreboard'}>
	{#if !ss.mobile}
		<div class="title grad-text">Edge Case</div>
	{/if}
	<Finances />
	{#if ss.mobile}
		<div class="divider">
			<Divider />
		</div>
	{/if}
	<Stats />
</div>

<style>
	.scoreboard,
	.scoreboard-m {
		display: grid;
		align-items: center;
		grid-auto-flow: column;
		place-content: space-between;
		margin: 40px 40px 0 45px;
		padding-left: 15px;
		border: 0px solid rgba(160, 126, 54, 0.333);
		border-bottom-width: 0.666667px;
	}

	.scoreboard-m {
		grid-auto-flow: initial;
		padding: 0;
		border: none;
		place-self: center;
		margin: 40px 0 0;
	}

	.title {
		display: grid;
		font-family: CG;
		font-style: italic;
		font-size: 40px;
	}

	.divider {
		grid-area: 2/1;
	}
</style>
