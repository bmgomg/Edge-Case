<script>
	import NumberFlow from '@number-flow/svelte';
	const { value } = $props();
</script>

<NumberFlow {value} trend={value < 0 ? 1 : -1} format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }} />

<style>
</style>
