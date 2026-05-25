<script>
	import Money from './Money.svelte';

	const { label, value } = $props();
</script>

<div class="article">
	<div class="label">{label}</div>
	<div class="value {label === 'Balance' ? 'balance' : ''} {value < 0 ? 'red' : ''}"><Money {value} /></div>
</div>

<style>
	.article {
		display: grid;
		width: 101px;
		place-content: center;
		place-items: center;
		overflow: hidden;
	}

	.label {
		letter-spacing: 0.22em;
		color: var(--subtitle);
		text-transform: uppercase;
		translate: 0 3px;
	}

	.value {
		font-family: LB;
		font-size: 40px;
		letter-spacing: -0.5px;
		color: var(--gold-deep);
		text-shadow: 0 2px 0 #000;
	}

	.balance {
		color: var(--gold);
	}

	.red {
		color: var(--red);
	}
</style>
