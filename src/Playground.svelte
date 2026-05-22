<script>
	import Board from './Board.svelte';
	import BuyUnused from './Buy Unused.svelte';
	import NumberSelector from './Number Selector.svelte';
	import OpSelector from './Op Selector.svelte';
	import PlayAgain from './Play Again.svelte';
</script>

<div class="playground">
	<Board/>
	<BuyUnused/>
	<NumberSelector/>
	<OpSelector/>
	<PlayAgain />
</div>

<style>
	.playground {
		display: grid;
		margin-left: 40px;
	}
</style>
