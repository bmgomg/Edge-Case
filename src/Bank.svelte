<script>
	import Money from './Money.svelte';
	import { bankBalance } from './shared.svelte';

	const bank = $derived(bankBalance());
</script>

<div class="bank {bank < 0 ? 'red' : ''}">
	<div class="label">balance</div>
	<div class="value"><Money value={bank} /></div>
</div>

<style>
	.bank {
		grid-area: 1/1;
		display: grid;
		width: 200px;
		place-content: center;
		place-items: center;
	}

	.label {
		letter-spacing: 0.22em;
		color: var(--subtitle);
		text-transform: uppercase;
		translate: 0 10px;
	}

	.value {
		font-family: BM;
		font-size: 44px;
		letter-spacing: -0.5px;
		color: var(--gold-dim);
	}

	.red {
		color: var(--red);
	}
</style>
