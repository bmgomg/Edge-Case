<script>
	import NumberFlow from '@number-flow/svelte';
	const { value, cents } = $props();
	const mfd = $derived(cents ? 2 : 0);
</script>

<NumberFlow {value} trend={value < 0 ? 1 : -1} format={{ style: 'currency', currency: 'USD', minimumFractionDigits: mfd, maximumFractionDigits: mfd }} />

<style>
</style>
