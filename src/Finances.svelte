<script>
	import Article from './Article.svelte';
	import { BANK } from './const';
	import { ss } from './shared.svelte';
</script>

<div class="panel">
	<Article label="bank" value={BANK} />
	<span class="sign">-</span>
	<Article label='cost' value={BANK - ss.balance} />
	<span class="sign eq">=</span>
	<Article label="balance" value={ss.balance} />
</div>

<style>
	.panel {
		display: grid;
		grid-auto-flow: column;
		gap: 5px;
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
