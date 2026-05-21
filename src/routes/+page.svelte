<script>
	import GamePage from '../Game Page.svelte';
	import Home from '../Home.svelte';
	import { ss } from '../shared.svelte';
	import { _sound } from '../sound.svelte';
	import Splash from '../Splash.svelte';
	import { clientRect, post } from '../utils';

	$effect(() => {
		const disable = (e) => {
			e.preventDefault();
		};

		const onResize = () => {
			let scx = 1;
			let scy = 1;

			const r = clientRect('.app');

			if (r.width < 1080) {
				scx = r.width / 1080;
			}

			if (r.height < 810) {
				scy = r.height / 810;
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
			<div class="frame"></div>
			<div class="frame-inner"></div>
			<div class="corner tl"></div>
			<div class="corner tr"></div>
			<div class="corner br"></div>
			<div class="corner bl"></div>
		</div>
		<div class="content" style="scale: {ss.scale};">
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
	}

	.home {
		background: var(--background);
	}

	.grad {
		position: absolute;
		background: radial-gradient(ellipse at 50% 38%, #0e3a2c 0%, #082319 55%, #040e09 100%);
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

	.frame {
		grid-area: 1/1;
		border: 1px solid var(--gold-dim);
		--off: 1em;
		width: calc(1080px - 2 * var(--off));
		height: calc(810px - 2 * var(--off));
		opacity: 0.7;
	}

	.frame-inner {
		grid-area: 1/1;
		border: 0.5px solid var(--gold-dim);
		--off: 1.5em;
		width: calc(1080px - 2 * var(--off));
		height: calc(810px - 2 * var(--off));
		opacity: 0.5;
	}

	.corner {
		--off: 0.15em;
		width: 0.85em;
		aspect-ratio: 1;
		rotate: 45deg;
		background: var(--gold-dim);
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
		width: 1080px;
		height: 810px;
		border: 1px dotted #ffffff40;
	}
</style>
