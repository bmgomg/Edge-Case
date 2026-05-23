<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { PENALTY } from './const';
	import { ss, onOver } from './shared.svelte';

	const onPay = () => {
		ss.balance = -PENALTY;
		delete ss.showPenalty;

		onOver('draw');
	};

	const onCancel = () => {
		delete ss.showPenalty;
	};

	const style = 'letter-spacing: 0.12em; font-size: 14px';
</script>

{#if ss.showPenalty && !ss.over}
	<div class="prompt" transition:fade={{ duration: 150 }}>
		<TextButton id="tb-buy-unused" text={[`Pay $${PENALTY + ss.balance} penalty?`]} framed onClick={onPay} {style} />
		<TextButton id="tb-no" text={['Never mind']} framed onClick={onCancel} {style}/>
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
