<script>
	import MusicControl from './Music Control.svelte';
	import SfxControl from './SFX Control.svelte';
	import { deckCodes, onRestart, resetStats, ss, stats, stopTimer } from './shared.svelte';
	import TextButton from './Text Button.svelte';

	const codes = $derived(deckCodes());
	const noHome = $derived(ss.to || ss.gather || ss.spread || ss.slide || (!ss.trayCell && codes.length && !ss.buy));
	const noRestart = $derived(ss.buy || ss.over || noHome);

	const onHome = () => {
		delete ss.from;
		delete ss.to;
		delete ss.targets;

		stopTimer();
		ss.home = true;
	};
</script>

<div class="toolbar">
	<div class="buttons">
		<TextButton id="tb-home" text={['home']} disabled={noHome} onClick={onHome} />
		<TextButton id="tb-restart" text={['give up']} disabled={noRestart} onClick={onRestart} />
		<TextButton id="tb-stats" text={['reset stats']} disabled={stats.plays === 0} onClick={resetStats} />
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
		margin: 40px;
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
