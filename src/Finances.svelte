<script>
	import Article from './Article.svelte';
	import { BANK } from './const';
	import { ss } from './shared.svelte';
</script>

<div class="panel">
	<Article label="Bank" value={BANK} />
	<span class="sign">-</span>
	<Article label={ss.over === 'surrender' ? 'Penalty' : 'Cost'} value={BANK - ss.balance} />
	<span class="sign eq">=</span>
	<Article label="Balance" value={ss.balance} />
</div>

<style>
	.panel {
		display: grid;
		grid-auto-flow: column;
		gap: 10px;
		align-items: center;
	}

	.sign {
		font-family: LB;
		font-size: 40px;
		color: var(--subtitle);
	}

	.eq {
		translate: 0 5px;
	}
</style>
