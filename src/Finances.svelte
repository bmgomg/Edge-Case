<script>
	import Article from './Article.svelte';
	import { ss } from './shared.svelte';
</script>

<div class='panel'>
	<Article label="bank" value={ss.bank} />
	<Article label="cost" value={ss.bank - ss.balance} />
	<Article label="balance" value={ss.balance} />
</div>

<style>
	.panel {
		display: grid;
		gap: 10px;
		justify-items: center;
	}
</style>
