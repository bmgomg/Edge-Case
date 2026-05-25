<script>
	import NumberFlow from '@number-flow/svelte';
	const { value, cents, trend = 1 } = $props();
	const mfd = $derived(cents ? 2 : 0);
</script>

<NumberFlow {value} {trend} format={{ style: 'currency', currency: 'USD', minimumFractionDigits: mfd, maximumFractionDigits: mfd }} />

<style>
</style>
