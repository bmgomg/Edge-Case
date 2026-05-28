<script>
	import NumberFlow from '@number-flow/svelte';
	const { value, cents, trend = 1 } = $props();
</script>

<NumberFlow
	{value}
	{trend}
	format={{
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
		maximumFractionDigits: cents ? 2 : 0
	}}
/>

<style>
</style>
