<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { APP_STATE, BANK, COST_BAD_SUBMIT, COST_GUESS } from './const';
	import { loadCommon, loadGame, onPlayOrResume, ss } from './shared.svelte';
	import TextButton from './Text Button.svelte';

	onMount(() => {
		ss.appKey = `${APP_STATE} • EASY`;

		ss.cols = 13;
		ss.rows = 6;
		ss.cellCount = ss.cols * ss.rows;

		loadCommon();
		loadGame();
	});
</script>

{#if ss.home}
	<div class="home" in:fade={{ duration: 200 }}>
		<div class="title-panel">
			<div class="tagline">what you don't know will cost you</div>
			<div class="title">Edge Case</div>
		</div>
		<div class="instructions">
			<span class="item">Eight unique numbers between 1 and 9 are hidden along the edges of a grid. A ninth number is set aside, unused.</span>
			<span class="item">Reveal a cell by buying an operator — the result of applying it to that row and column is shown.</span>
			<span class="item">No two cells in the same row or column can share the same operator.</span>
			<span class="item">When you've seen enough, enter your guesses for all eight edge numbers and hit Done — but every incorrect submission costs $${COST_BAD_SUBMIT}.</span>
			<span class="financial">{`You start with $${BANK}. Each operation costs money — multiplication the most, subtraction the least. Guessing a number costs $${COST_GUESS}. Revealing the unused number has a price too. Finish in the black — or break the bank trying.`}</span>
		</div>
		<div class='buttons'>
		<TextButton id="tb-play" text={[ss.ticks && !ss.over ? 'Resume' : 'Play']} framed style="width: 150px;" onClick={onPlayOrResume} />
		</div>
	</div>
{/if}

<style>
	.home {
		place-self: center;
		grid-area: 1/1;
		display: grid;
		justify-items: center;
		user-select: none;
	}

	.title-panel {
		display: grid;
		place-items: center;
	}

	.tagline {
		font-family: CG;
		font-style: italic;
		font-size: 14px;
		letter-spacing: 0.18em;
		color: var(--bone-dim);
		text-shadow: 0 3px 0 #000;
		text-transform: uppercase;
		margin-bottom: 14px;
	}

	.title {
		font-family: LBI;
		font-weight: 500;
		font-size: 85px;
		line-height: 0.9;
		color: var(--gold-dim);
		letter-spacing: -2px;
		text-shadow: 0px 5px 0px #000;
	}

	.instructions {
		margin: 50px 0 15px;
		padding: 24px 32px;
		max-width: 610px;
		background: linear-gradient(rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.55) 100%);
		border: 1px solid rgba(160, 126, 54, 0.533);
		border-radius: 4px;
		box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 20px inset;
		font-family: DMS;
		color: rgb(244, 234, 214);
		font-size: 19px;
		line-height: 1.6;
		display: grid;
		gap: 12px;
	}

	.item {
		color: var(--instr-text);
	}

	.financial {
		border-top: 0.5px solid rgb(106, 84, 36);
		margin-top: 10px;
		padding-top: 20px;
		font-family: CG;
		font-style: italic;
		font-size: 20px;
		color: rgb(214, 178, 100);
		letter-spacing: 0.3px;
		line-height: initial;
	}

	.buttons {
		margin-top: 32px;
	}
</style>
