<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { COST_UNUSED } from './const';
	import { ss } from './shared.svelte';
	import { _sound } from './sound.svelte';

	const onBuy = () => {
		_sound.play('coin2');

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
		grid-area: 3/1;
		place-self: center;
		display: grid;
		grid-auto-flow: column;
		gap: 20px;
	}
</style>
