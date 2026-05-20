<script>
	import Bank from './Bank.svelte';
	import { elapsedSecs } from './shared.svelte';
	import Timer from './Timer.svelte';
</script>

<div class="counters">
	<Bank />
	{#if false}
		<Timer secs={elapsedSecs()} />
	{/if}
</div>

<style>
	.counters {
		display: grid;
		place-content: center;
		width: 200px;
		place-items: center;
	}
</style>
