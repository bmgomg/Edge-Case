<script>
	import NumberFlow from '@number-flow/svelte';
	const { value } = $props();
</script>

<NumberFlow {value} trend={value < 0 ? 1 : -1} format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }} />

<style>
</style>
