<script>
	import MusicControl from './Music Control.svelte';
	import SfxControl from './SFX Control.svelte';
	import { onRestart, resetStats, ss, stats } from './shared.svelte';
	import TextButton from './Text Button.svelte';

	const noHome = $derived(false);
	const noRestart = $derived(ss.buy || ss.over || noHome);

	const onHome = () => {
		delete ss.from;
		delete ss.to;
		delete ss.targets;

		ss.home = true;
	};

	const onClear = () => {};
</script>

<div class="toolbar">
	<div class="buttons">
		<TextButton id="tb-home" text={['home']} disabled={noHome} onClick={onHome} />
		<TextButton id="tb-restart" text={['give up']} disabled={noRestart} onClick={onRestart} />
		<TextButton id="tb-stats" text={['reset stats']} disabled={stats.plays === 0} onClick={resetStats} />
		<TextButton id="tb-clear" text={['clear all guesses']} disabled={false} onClick={onClear} />
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
