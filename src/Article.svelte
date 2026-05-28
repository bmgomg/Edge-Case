<script>
	import Money from './Money.svelte';
	import { ss } from './shared.svelte';

	const { label, value } = $props();
	const balance = $derived(label === 'balance');
</script>

<div class={ss.mobile ? 'article-m' : 'article'}>
	<div class="label">{label}</div>
	<div class="value {balance ? 'balance' : ''} {value < 0 ? 'red' : ''}"><Money {value} trend={balance ? -1 : 1} /></div>
</div>

<style>
	.article, .article-m {
		display: grid;
		width: 101px;
		place-content: center;
		place-items: center;
		overflow: hidden;
	}

	.article-m {
		width: auto;
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
