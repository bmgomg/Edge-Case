<script>
	import Board from './Board.svelte';
	import BuyUnused from './Buy Unused.svelte';
	import ConfirmSurrender from './Confirm Surrender.svelte';
	import Done from './Done.svelte';
	import Message from './Message.svelte';
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
	<ConfirmSurrender />
	<Done />
	<PlayAgain />
	<div class="disclaimer">
		<span>music by Eric Matyas  •  www.soundimage.org</span>
	</div>
</div>

<style>
	.playground {
		display: grid;
		grid: 1fr 420px 1fr / auto;
	}

	.disclaimer {
		grid-area: 3/1;
		place-self: end;
		font-size: 10px;
		text-transform: uppercase;
		margin: 0 45px 5px 0;
		color: var(--gold-deep);
	}
</style>
