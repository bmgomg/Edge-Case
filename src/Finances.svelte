<script>
	import Article from './Article.svelte';
	import { BANK } from './const';
	import { ss } from './shared.svelte';
</script>

<div class={ss.mobile ? 'panel-m mobile-scale' : 'panel'}>
	<Article label="bank" value={BANK} />
	<span class="sign">-</span>
	<Article label="cost" value={BANK - ss.balance} />
	<span class="sign eq">=</span>
	<Article label="balance" value={ss.balance} />
</div>

<style>
	.panel,
	.panel-m {
		grid-area: 1/2;
		display: grid;
		grid-auto-flow: column;
		gap: 5px;
		align-items: center;
	}

	.panel-m {
		grid-area: 2/1;
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
