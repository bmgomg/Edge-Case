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
</script>

<div class={ss.mobile ? 'toolbar-m' : 'toolbar'}>
	{#if ss.mobile}
		<div class="divider">
			<Divider />
		</div>
	{/if}
	<div class="buttons {ss.mobile ? 'buttons-m' : ''}">
		<TextButton id="tb-home" text={['home']} onClick={onHome} />
		<TextButton id="tb-surrender" text={['give up']} disabled={noSurrender} onClick={onGiveUp} />
		<TextButton id="tb-stats" text={ss.mobile ? ['reset', 'stats'] : ['reset stats']} disabled={stats.plays === 0} onClick={resetStats} />
		<TextButton
			id="tb-clear-all"
			text={ss.mobile ? ['clear all', 'guesses'] : ['clear all guesses']}
			disabled={noClear}
			onClick={onClear}
		/>
	</div>
	<div class={ss.mobile ? 'sound-controls-m' : 'sound-controls'}>
		<MusicControl />
		<SfxControl />
	</div>
	<div class={ss.mobile ? 'disclaimer-m' : 'disclaimer'}>
		<span>by Eric Matyas  •  www.soundimage.org</span>
	</div>
</div>

<style>
	.toolbar,
	.toolbar-m {
		grid-area: 3/1;
		align-self: center;
		display: grid;
		padding: 0 10px;
		align-items: center;
		margin: 0 40px 40px;
		padding-top: 20px;
		border: 0px solid rgba(160, 126, 54, 0.333);
		border-top-width: 0.666667px;
	}

	.toolbar-m {
		margin: 0 0 40px;
		border: none;
		padding: 0;
	}

	.divider {
		grid-area: 1/1;
		margin: 10px auto 20px;
	}

	.buttons {
		grid-area: 1/1;
		place-self: start;
		display: grid;
		grid-auto-flow: column;
		gap: 30px;
	}

	.buttons-m {
		grid-area: 2/1;
		place-self: center;
		gap: 30px;
	}

	.sound-controls,
	.sound-controls-m {
		grid-area: 1/1;
		justify-self: end;
		translate: 20px;
		display: grid;
		grid-auto-flow: column;
		gap: 20px;
		color: var(--gold-deep);
	}

	.sound-controls-m {
		grid-area: 3/1;
		margin-top: 10px;
		gap: 20px;
		translate: 18px;
	}

	.disclaimer,
	.disclaimer-m {
		grid-area: 2/1;
		place-self: end;
		font-size: 10px;
		text-transform: lowercase;
		margin: 5px 117px 0 0;
		color: var(--gold-deep);
	}

	.disclaimer-m {
		display: none;
		grid-area: 3/1;
		margin: 5px 179px 0 0;
	}
</style>
