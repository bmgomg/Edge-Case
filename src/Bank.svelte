<script>
	import Money from './Money.svelte';
	import { ss } from './shared.svelte';
</script>

<div class="bank {ss.balance < 0 ? 'red' : ''}">
	<div class="label">balance</div>
	<div class="value"><Money value={ss.balance} /></div>
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
		translate: 0 3px;
	}

	.value {
		font-family: LB;
		font-size: 40px;
		letter-spacing: -0.5px;
		color: var(--gold-dim);
		text-shadow: 0 2px 0 #000;
	}

	.red {
		color: var(--red);
	}
</style>
