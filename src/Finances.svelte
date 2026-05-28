<script>
	import Article from './Article.svelte';
	import { BANK } from './const';
	import { ss } from './shared.svelte';
</script>

<div class={ss.vert ? 'panel-v v-scale' : 'panel'}>
	<Article label="bank" value={BANK} />
	<span class="sign">-</span>
	<Article label="cost" value={BANK - ss.balance} />
	<span class="sign eq">=</span>
	<Article label="balance" value={ss.balance} />
</div>

<style>
	.panel,
	.panel-v {
		grid-area: 1/2;
		display: grid;
		grid-auto-flow: column;
		gap: 5px;
		align-items: center;
	}

	.panel-v {
		grid-area: 3/1;
		gap: 15px;
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
