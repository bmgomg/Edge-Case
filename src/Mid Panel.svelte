<script>
	import Playground from './Playground.svelte';
	import PricePanel from './Price Panel.svelte';

</script>

<div class="mid-panel">
    <Playground/>
    <!-- <PricePanel/> -->
</div>

<style>
	.mid-panel {
		display: grid;
        grid: auto / 1fr auto;
	}
</style>
