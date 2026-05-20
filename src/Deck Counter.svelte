<script>
	import Deck from '$lib/images/Deck.webp';
	import NumberFlow from '@number-flow/svelte';
	import { deckCodes } from './shared.svelte';
</script>

<div class="counter">
	<img class="deck" src={Deck} alt="" width={80} />
	<div class="flow"><NumberFlow value={deckCodes().length} /></div>
</div>

<style>
	.counter {
		grid-area: 1/1;
		place-self: center start;
		display: grid;
		margin: 0 40px;
        place-content: center;
		place-items: center;
        margin-right: 50px;
	}

	.deck {
        grid-area: 1/1;
		opacity: 0.8;
	}

	.flow {
        grid-area: 1/1;
		margin-left: 15px;
		font-family: RC;
		font-size: 18px;
		color: var(--water);
	}
</style>
