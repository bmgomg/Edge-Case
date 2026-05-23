<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { COST_UNUSED } from './const';
	import { ss } from './shared.svelte';

	const onBuy = () => {
		ss.showUnused = true;
		ss.balance -= COST_UNUSED;

		delete ss.buyUnused;
	};

	const style = 'letter-spacing: 0.12em;';
</script>

{#if ss.buyUnused && !ss.over}
	<div class="prompt" transition:fade={{ duration: 150 }}>
		<TextButton id="tb-buy-unused" text={[`Pay $${COST_UNUSED}?`]} framed onClick={onBuy} {style} />
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
	}
</style>
