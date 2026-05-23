<script>
	import MusicControl from './Music Control.svelte';
	import SfxControl from './SFX Control.svelte';
	import { resetStats, ss, stats } from './shared.svelte';
	import TextButton from './Text Button.svelte';

	const noRestart = $derived(ss.buy || ss.over || ss.showPenalty);

	const onHome = () => {
		delete ss.from;
		delete ss.to;
		delete ss.targets;

		ss.home = true;
	};

	const onClear = () => {
		ss.cells.forEach((c) => delete c.guess);
	};

	const onGiveUp = () => {
		ss.showPenalty = true;

		delete ss.buyUnused;
		delete ss.buyOp;
		delete ss.guess;
	};
</script>

<div class="toolbar">
	<div class="buttons">
		<TextButton id="tb-home" text={['home']} onClick={onHome} />
		<TextButton id="tb-restart" text={['give up']} disabled={noRestart} onClick={onGiveUp} />
		<TextButton id="tb-stats" text={['reset stats']} disabled={stats.plays === 0} onClick={resetStats} />
		<TextButton id="tb-clear" text={['clear all guesses']} disabled={ss.cells?.every((c) => !c.guess)} onClick={onClear} />
	</div>
	<div class="sound-controls">
		<MusicControl />
		<SfxControl/>
	</div>
</div>

<style>
	.toolbar {
		grid-area: 3/1;
		align-self: center;
		display: grid;
		padding: 0 10px;
		align-items: center;
		gap: 35px;
		margin: 0 40px 40px;
		padding-top: 20px;
		border: 0px solid rgba(160, 126, 54, 0.333);
		border-top-width: 0.666667px;
	}

	.buttons {
		grid-area: 1/1;
		justify-self: start;
		display: grid;
		grid-auto-flow: column;
		gap: 30px;
	}

	.sound-controls {
		grid-area: 1/1;
		justify-self: end;
		translate: 20px;
		display: grid;
		grid-auto-flow: column;
		gap: 20px;
		color: var(--gold-deep);
	}
</style>
