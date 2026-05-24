<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { PENALTY } from './const';
	import { onOver, ss } from './shared.svelte';

	const onPay = () => {
		delete ss.showPenalty;
		onOver('surrender');
	};

	const onCancel = () => {
		delete ss.showPenalty;
	};

	const style = 'letter-spacing: 0.12em; font-size: 14px;';
</script>

{#if ss.showPenalty && !ss.over}
	<div class="prompt" transition:fade={{ duration: 150 }}>
		<TextButton id="tb-penalty" text={[`Pay $${PENALTY} penalty?`]} framed onClick={onPay} {style} />
		<TextButton id="tb-nm" text={['Never mind']} framed onClick={onCancel} {style} />
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
