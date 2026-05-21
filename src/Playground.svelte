<script>
	import Board from './Board.svelte';
	import BuyUnused from './Buy Unused.svelte';
	import PlayAgain from './Play Again.svelte';
</script>

<div class="playground">
	<Board/>
	<BuyUnused/>
	<PlayAgain />
</div>

<style>
	.playground {
		display: grid;
		margin-left: 40px;
	}
</style>
