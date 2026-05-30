<script>
	import Divider from './Divider.svelte';
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

	const style = $derived(ss.vert ? '' : 'place-self: start; place-items: start;');
</script>

<div class={ss.vert ? 'toolbar-v' : 'toolbar'}>
	{#if ss.vert}
		<div class="divider">
			<Divider />
		</div>
	{/if}
	<div class={ss.vert ? 'buttons-v' : 'buttons'}>
		<TextButton id="tb-home" text={['home']} onClick={onHome} {style}/>
		<TextButton id="tb-surrender" text={['give up']} disabled={noSurrender} onClick={onGiveUp}  {style}/>
		<TextButton id="tb-clear-all" text={['clear all', 'guesses']} disabled={noClear} onClick={onClear}  {style}/>
		<TextButton id="tb-stats" text={ss.vert ? ['reset', 'stats'] : ['reset stats']} disabled={stats.plays === 0} onClick={resetStats}  {style}/>
	</div>
	<div class={ss.vert ? 'sound-controls-v' : 'sound-controls'}>
		{#if ss.vert}
			<MusicControl />
			<SfxControl />
		{:else}
			<SfxControl />
			<MusicControl />
			{#if !ss.vert}
				<div class="disclaimer"><span>by Eric Matyas </span><span>www.soundimage.org</span></div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.toolbar {
		grid-area: 1/1;
		place-self: center start;
		display: grid;
		justify-items: center;
		gap: 200px;
		margin-left: 33px;
	}

	.toolbar-v {
		grid-area: 3/1;
		align-self: center;
		display: grid;
		align-items: center;
		padding-top: 20px;
		border-top-width: 0.666667px;
		margin: 0 0 40px;
		border: none;
		padding: 0;
	}

	.divider {
		grid-area: 1/1;
		margin: 5px auto 20px;
	}

	.buttons {
		display: grid;
		justify-items: start;
		gap: 30px;
		justify-self: start;
	}

	.buttons-v {
		display: grid;
		grid-auto-flow: column;
		place-self: center;
		gap: 30px;
	}

	.sound-controls {
		display: grid;
		color: var(--gold-deep);
		justify-self: start;
		gap: 30px;
	}

	.sound-controls-v {
		grid-area: 3/1;
		justify-self: end;
		display: grid;
		grid-auto-flow: column;
		color: var(--gold-deep);
		margin-top: 10px;
		gap: 20px;
		translate: 25px;
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
