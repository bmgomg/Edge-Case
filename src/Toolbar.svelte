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

<div class='toolbar'>
	<div class="buttons">
		<TextButton id="tb-home" text={['home']} onClick={onHome} />
		<TextButton id="tb-surrender" text={['give up']} disabled={noSurrender} onClick={onGiveUp} />
		<TextButton
			id="tb-clear-all"
			text={['clear all', 'guesses']}
			disabled={noClear}
			onClick={onClear}
		/>
		<TextButton id="tb-stats" text={['reset stats']} disabled={stats.plays === 0} onClick={resetStats} />
	</div>
	<Divider />
	<!-- <div class='sound-controls'>
		<MusicControl />
		<SfxControl />
	</div> -->
	<!-- <div class={ss.vert ? 'disclaimer-v' : 'disclaimer'}>
		<span>by Eric Matyas  •  www.soundimage.org</span>
	</div> -->
</div>

<style>
	.toolbar {
		grid-area: 1/1;
		place-self: center start;
		display: grid;
		justify-items: center;
		gap: 50px;
		margin-left: 35px;
	}

	.divider {
		grid-area: 1/1;
		margin: 5px auto 20px;
	}

	.buttons {
		display: grid;
		justify-items: start;
		gap: 30px;
	}

	.sound-controls {
		grid-area: 1/1;
		display: grid;
		gap: 20px;
		color: var(--gold-deep);
	}

	.disclaimer,
	.disclaimer-v {
		grid-area: 2/1;
		place-self: end;
		font-size: 10px;
		text-transform: lowercase;
		margin: 5px 117px 0 0;
		color: var(--gold-deep);
	}

	.disclaimer-v {
		display: none;
		grid-area: 3/1;
		margin: 5px 179px 0 0;
	}
</style>
