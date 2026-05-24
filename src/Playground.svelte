<script>
	import Board from './Board.svelte';
	import BuyUnused from './Buy Unused.svelte';
	import ConfirmPenalty from './Confirm Penalty.svelte';
	import Done from './Done.svelte';
	import Message from './Cheer.svelte';
	import NumberSelector from './Number Selector.svelte';
	import OpSelector from './Op Selector.svelte';
	import PlayAgain from './Play Again.svelte';
</script>

<div class="playground">
	<Message />
	<Board />
	<BuyUnused />
	<NumberSelector />
	<OpSelector />
	<ConfirmPenalty />
	<Done />
	<PlayAgain />
</div>

<style>
	.playground {
		display: grid;
		grid: 1fr 420px 1fr / auto;
	}
</style>
