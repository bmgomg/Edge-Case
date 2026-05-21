<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { COST_UNUSED } from './const';
	import { ss } from './shared.svelte';

	const onBuy = () => {
		ss.showUnused = true;
		delete ss.buyUnused;
	};

	const onCancel = () => {
		delete ss.buyUnused;
	};
</script>

{#if ss.buyUnused}
	<div class="prompt" transition:fade={{ duration: 150 }}>
		<TextButton id="tb-buy-unused" text={[`Pay $${COST_UNUSED}?`]} framed onClick={onBuy} style="letter-spacing: 0.12em;;" />
		<TextButton id="tb-no" text={['No']} framed onClick={onCancel} />
	</div>
{/if}

<style>
	.prompt {
		grid-area: 1/1;
		place-self: end center;
		display: grid;
		grid-auto-flow: column;
		gap: 20px;
		margin: 30px 0;
		font-size: 20px;
	}
</style>
