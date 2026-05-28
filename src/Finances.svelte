<script>
	import Article from './Article.svelte';
	import { ss } from './shared.svelte';
</script>

<div class={ss.vert ? 'panel-v v-scale' : 'panel'}>
	<Article label="bank" value={ss.bank} />
	<Article label="cost" value={ss.bank - ss.balance} />
	<Article label="balance" value={ss.balance} />
</div>

<style>
	.panel {
		/* place-self: start center; */
		display: grid;
		gap: 10px;
		justify-items: center;
	}
</style>
