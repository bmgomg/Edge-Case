<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { APP_STATE, BANK } from './const';
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
			<div class={ss.vert ? 'title-v' : 'title'}>
				<div class="shadow"> Edge Case </div>
				<div class="ga11 grad-text"> Edge Case </div>
			</div>
		</div>
		<div class={ss.vert ? 'instr-v' : 'instr'}>
			<span>Eight unique numbers between 1 and 9 are hidden along the edges of a grid. A ninth number is set aside, unused.</span>
			<span>Reveal a cell by buying an operator — the result of applying it to that row and column is shown.</span>
			<span>No two cells in the same row or column can share the same operator.</span>
			<span>When you've seen enough, enter your guesses for all eight edge numbers and hit Done.</span>
			<span class="financial"
				>You start with ${BANK}. Each operation costs money. Revealing the unused number gives you a bonus — but at a price. Guessing a number is free, but
				changing your mind is not. Every incorrect submission incurs a penalty. Finish in the black — or break the bank trying.</span
			>
		</div>
		<div class="buttons">
			<TextButton id="tb-play" text={[ss.cells && !ss.over ? 'Resume' : 'Play']} framed style="width: 150px;" onClick={onPlayOrResume} />
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
	}

	.title,
	.title-v {
		display: grid;
		font-family: CG;
		font-style: italic;
		font-size: 90px;
		line-height: 1.2;
		letter-spacing: -2px;
	}

	.title-v {
		font-size: 75px;
	}

	.shadow {
		grid-area: 1/1;
		text-shadow: 0 3px 0 #000;
	}

	.instr,
	.instr-v {
		margin: 40px 0 15px;
		padding: 24px 32px;
		width: 610px;
		background: linear-gradient(rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.55) 100%);
		border: 1px solid rgba(160, 126, 54, 0.533);
		border-radius: 4px;
		box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 20px inset;
		font-family: DMS;
		color: rgb(244, 234, 214);
		font-size: 19px;
		line-height: 1.4;
		display: grid;
		gap: 12px;
	}

	.instr-v {
		width: 380px;
		margin: 40px 0 10px;
		padding: 0;
		font-size: 17px;
		line-height: 1.4;
		background: none;
		border: none;
	}

	.financial {
		border-top: 0.5px solid rgb(106, 84, 36);
		margin-top: 10px;
		padding-top: 20px;
		font-family: CG;
		font-style: italic;
		font-size: 20.5px;
		color: rgb(214, 178, 100);
		letter-spacing: 0.3px;
		line-height: initial;
	}

	.buttons {
		margin-top: 32px;
	}
</style>
