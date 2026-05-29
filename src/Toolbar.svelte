<script>
	import MusicControl from './Music Control.svelte';
	import SfxControl from './SFX Control.svelte';
	import { persist, resetStats, ss, stats } from './shared.svelte';
	import TextButton from './Text Button.svelte';

	const noSurrender = $derived(ss.buy || ss.over || ss.promptSurrender);
	const noClear = $derived(ss.over || ss.cells?.every((c) => !c.guess));

	const onHome = () => {
		delete ss.buyUnused;
		delete ss.buyOp;
		delete ss.guessing;

		ss.home = true;
	};

	const onClear = () => {
		ss.cells.forEach((c) => delete c.guess);
		persist();
	};

	const onGiveUp = () => {
		ss.promptSurrender = true;

		delete ss.buyUnused;
		delete ss.buyOp;
		delete ss.guessing;
	};
</script>

<div class="toolbar">
	<div class="buttons">
		<TextButton id="tb-home" text={['home']} onClick={onHome} />
		<TextButton id="tb-surrender" text={['give up']} disabled={noSurrender} onClick={onGiveUp} />
		<TextButton id="tb-clear-all" text={['clear all', 'guesses']} disabled={noClear} onClick={onClear} />
		<TextButton id="tb-stats" text={['reset stats']} disabled={stats.plays === 0} onClick={resetStats} />
	</div>
	<div class="sound-controls">
		<SfxControl />
		<MusicControl />
		<div class="disclaimer"><span>by Eric Matyas </span><span>www.soundimage.org</span></div>
	</div>
</div>

<style>
	.toolbar {
		grid-area: 1/1;
		place-self: center start;
		display: grid;
		justify-items: center;
		gap: 200px;
		margin-left: 30px;
	}

	.buttons {
		display: grid;
		justify-items: start;
		gap: 30px;
		justify-self: start;
	}

	.sound-controls {
		display: grid;
		color: var(--gold-deep);
		justify-self: start;
		gap: 30px;
	}

	.disclaimer {
		display: grid;
		font-size: 11px;
		text-transform: lowercase;
		color: var(--gold-deep);
		margin-top: -15px;
		letter-spacing: 0.15em;
	}
</style>
