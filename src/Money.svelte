<script>
	import NumberFlow from '@number-flow/svelte';
	const { value, cents, trend = 1 } = $props();
	const mfd = $derived(cents ? 2 : 0);
</script>

<NumberFlow
	{value}
	{trend}
	format={{ style: 'currency', currency: 'USD', minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: mfd }}
/>

<style>
</style>
