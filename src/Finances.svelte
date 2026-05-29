<script>
	import Article from './Article.svelte';
	import { ss } from './shared.svelte';
</script>

<div class={ss.vert ? 'panel-v v-scale' : 'panel'}>
	<Article label="bank" value={ss.bank} />
	{#if ss.vert}
		<span class="sign">-</span>
	{/if}
	<Article label="cost" value={ss.bank - ss.balance} />
	{#if ss.vert}
		<span class="sign eq">=</span>
	{/if}
	<Article label="balance" value={ss.balance} />
</div>

<style>
	.panel {
		display: grid;
		gap: 10px;
		justify-items: center;
	}

	.panel-v {
		display: grid;
		grid-auto-flow: column;
		align-items: center;
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
