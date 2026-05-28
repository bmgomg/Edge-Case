<script>
	import Board from './Board.svelte';
	import BuyUnused from './Buy Unused.svelte';
	import ConfirmSurrender from './Confirm Surrender.svelte';
	import Done from './Done.svelte';
	import Message from './Message.svelte';
	import NumberSelector from './Number Selector.svelte';
	import OpSelector from './Op Selector.svelte';
	import PlayAgain from './Play Again.svelte';
	import { ss } from './shared.svelte';
</script>

<div class="playground {ss.vert ? 'playground-v' : ''}">
	<Message />
	<Board />
	<BuyUnused />
	<NumberSelector />
	<OpSelector />
	<ConfirmSurrender />
	<Done />
	<PlayAgain />
</div>

<style>
	.playground {
		display: grid;
		grid: 0.6fr 420px 1fr / auto;
	}

	.playground-v {
		grid: 0.6fr 378px 1fr / auto;
	}
</style>
