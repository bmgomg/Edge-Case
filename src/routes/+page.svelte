<script>
	import { fade } from 'svelte/transition';
	import GamePage from '../Game Page.svelte';
	import Home from '../Home.svelte';
	import { ss } from '../shared.svelte';
	import { _sound } from '../sound.svelte';
	import Splash from '../Splash.svelte';
	import { clientRect, post } from '../utils';

	const DX = 1080;
	const DY = 810;
	const DXM = 468;
	const DYM = 836;

	$effect(() => {
		const disable = (e) => {
			e.preventDefault();
		};

		const onResize = () => {
			let scx = 1;
			let scy = 1;

			const r = clientRect('.app');
			ss.vert = r.height / r.width > 0.85;
			const dx = ss.vert ? DXM : DX;
			const dy = ss.vert ? DYM : DY;

			if (r.width < dx) {
				scx = r.width / dx;
			}

			if (r.height < dy) {
				scy = r.height / dy;
			}

			ss.scale = Math.min(scx, scy);
		};

		const toggleMusic = () => {
			_sound.music = -_sound.music;
			_sound.playMusic();
		};

		const onBlur = () => {
			if (_sound.music > 0 && _sound.musicPlayed) {
				toggleMusic();
			}
		};

		const onFocus = () => {
			if (_sound.music < 0) {
				toggleMusic();
			}
		};

		onResize();

		window.addEventListener('contextmenu', disable);
		window.addEventListener('dblclick', disable);
		window.addEventListener('resize', onResize);
		window.addEventListener('blur', onBlur);
		window.addEventListener('focus', onFocus);

		return () => {
			window.removeEventListener('contextmenu', disable);
			window.removeEventListener('dblclick', disable);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('blur', onBlur);
			window.removeEventListener('focus', onFocus);
		};
	});

	let splash = $state(true);
	post(() => (splash = false), 2000);
</script>

<div class="app {ss.home ? 'home' : ''}">
	{#if splash}
		<Splash />
	{:else}
		<div class="grad"></div>
		<div class="frame-box" style="scale: {ss.scale};">
			<div class={ss.vert ? 'frame-v' : 'frame'}></div>
			<div class={ss.vert ? 'frame-inner-v' : 'frame-inner'}></div>
			<div class="corner tl"></div>
			<div class="corner tr"></div>
			<div class="corner br"></div>
			<div class="corner bl"></div>
			{#if ss.home}
				<div class="corner-mark cm-tl" transition:fade></div>
				<div class="corner-mark cm-tr" transition:fade></div>
				<div class="corner-mark cm-br" transition:fade></div>
				<div class="corner-mark cm-bl" transition:fade></div>
			{/if}
		</div>
		<div class="content {ss.vert ? 'content-v' : ''}" style="scale: {ss.scale};">
			<GamePage />
			<Home />
		</div>
	{/if}
</div>

<style>
	.app {
		height: 100dvh;
		display: grid;
		box-sizing: border-box;
		overflow: hidden;
		place-content: center;
		--dx: 1080px;
		--dy: 810px;
		--dxm: 468px;
		--dym: 836px;
	}

	.home {
		background: var(--background);
	}

	.grad {
		position: absolute;
		background: radial-gradient(ellipse at 50% 50%, #0e3a2c 0%, #082319 55%, #040e09 100%);
		filter: hue-rotate(90deg);
		height: 100dvh;
		width: 100dvw;
	}

	.frame-box {
		grid-area: 1/1;
		place-self: center;
		place-items: center;
		display: grid;
	}

	.frame,
	.frame-v {
		grid-area: 1/1;
		border: 1px solid var(--gold-dim);
		--off: 15px;
		width: calc(var(--dx) - 2 * var(--off));
		height: calc(var(--dy) - 2 * var(--off));
		opacity: 0.7;
	}

	.frame-v {
		--off: 15px;
		width: calc(var(--dxm) - 2 * var(--off));
		height: calc(var(--dym) - 2 * var(--off));
	}

	.frame-inner,
	.frame-inner-v {
		grid-area: 1/1;
		border: 0.5px solid var(--gold-dim);
		--off: 22.5px;
		width: calc(var(--dx) - 2 * var(--off));
		height: calc(var(--dy) - 2 * var(--off));
		opacity: 0.5;
	}

	.frame-inner-v {
		--off: 22.5px;
		width: calc(var(--dxm) - 2 * var(--off));
		height: calc(var(--dym) - 2 * var(--off));
	}

	.corner-mark {
		--off: 12px;
		grid-area: 1/1;
		height: 32px;
		aspect-ratio: 1;
		opacity: 0.7;
		box-sizing: border-box;
		border: solid var(--gold);
	}

	.cm-tl {
		place-self: start;
		border-width: 2px 0 0 2px;
		translate: var(--off) var(--off);
	}

	.cm-tr {
		place-self: start end;
		border-width: 2px 2px 0 0;
		translate: calc(-1 * var(--off)) var(--off);
	}

	.cm-br {
		place-self: end;
		border-width: 0 2px 2px 0;
		translate: calc(-1 * var(--off)) calc(-1 * var(--off));
	}

	.cm-bl {
		place-self: end start;
		border-width: 0 0 2px 2px;
		translate: var(--off) calc(-1 * var(--off));
	}

	.corner {
		--off: 2.25px;
		width: 12.75px;
		aspect-ratio: 1;
		rotate: 45deg;
		background: linear-gradient(135deg, var(--gold), var(--gold-dim) 50%, var(--gold-deep));
	}

	.tl {
		grid-area: 1/1;
		place-self: start;
		translate: calc(-1 * var(--off)) calc(-1 * var(--off));
	}

	.tr {
		grid-area: 1/1;
		place-self: start end;
		translate: var(--off) calc(-1 * var(--off));
	}

	.br {
		grid-area: 1/1;
		place-self: end;
		translate: var(--off) var(--off);
	}

	.bl {
		grid-area: 1/1;
		place-self: end start;
		translate: calc(-1 * var(--off)) var(--off);
	}

	.content {
		grid-area: 1/1;
		place-self: center;
		display: grid;
		touch-action: none;
		box-sizing: border-box;
		width: var(--dx);
		height: var(--dy);
	}

	.content-v {
		width: var(--dxm);
		height: var(--dym);
	}
</style>
