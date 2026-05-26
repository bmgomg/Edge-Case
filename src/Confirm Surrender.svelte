<script>
	import { fade } from 'svelte/transition';
	import TextButton from './Text Button.svelte';
	import { onOver, ss } from './shared.svelte';

	const onPay = () => {
		delete ss.promptSurrender;
		onOver('surrender');
	};

	const onCancel = () => {
		delete ss.promptSurrender;
	};

	const style = 'letter-spacing: 0.04em; font-size: 14px; padding: 0.5rem 0.9rem;';
</script>

{#if ss.promptSurrender && !ss.over}
	<div class="prompt" transition:fade={{ duration: 150 }}>
		<TextButton id="tb-confirm-surrender" text={['Stats will be reset — give up?']} framed onClick={onPay} {style} />
		<TextButton id="tb-nm" text={['Never mind']} framed onClick={onCancel} {style} />
	</div>
{/if}

<style>
	.prompt {
		grid-area: 3/1;
		place-self: center;
		display: grid;
		grid-auto-flow: column;
		gap: 10px;
	}
</style>
