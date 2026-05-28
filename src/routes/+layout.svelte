<script>
	import favicon from '$lib/images/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global {
		body {
			margin: 0;
			padding: 0;
			height: 100dvh;
			width: 100%;
			--bone: #f4ead6;
			--bone-dim: #bfb39a;
			--dash: #a07e36;
			--subtitle: #a07e36;
			--deep-purple: #191b31;
			--separator: #6a5424;
			--button-background: linear-gradient(180deg, #f3d27a 0%, #d6b264 50%, #a07e36 100%);
			--button-color: #051710;
			--background: #160e3a;
			--slider-track: #a07e3680;
			--red: #c1302a;
			--darkred: #7d2222;
			--gold: #f3d27a;
			--gold-dim: #d6b264;
			--gold-deep: #a07e36;
			--water: #082319;
			--lavender: #bcb0da;
			background: var(--background);
			color: var(--bone);
			background-size: 350px;
			font-family: Cinzel;
		}

		.button-base {
			box-sizing: border-box;
			display: grid;
			place-content: center;
			transition: transform 0.1s;
			cursor: pointer;
		}

		.button-base:focus {
			outline: none !important;
		}

		.no-highlight {
			-webkit-tap-highlight-color: transparent;
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}

		.nope {
			pointer-events: none;
		}

		.ga11 {
			grid-area: 1/1;
		}

		.grad-text {
			background: -webkit-linear-gradient(-90deg, var(--bone), var(--gold-dim) 70%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			text-shadow: none;
			background-size: cover;
			background-position: center;
		}

		.v-scale {
			scale: 0.9;
		}

		@font-face {
			font-family: LB;
			src: url('$lib/fonts/Libre Bodoni.ttf');
		}

		@font-face {
			font-family: LBI;
			src: url('$lib/fonts/Libre Bodoni Italic.ttf');
		}

		@font-face {
			font-family: Cinzel;
			src: url('$lib/fonts/Cinzel.ttf');
		}

		@font-face {
			font-family: CG;
			src: url('$lib/fonts/Cormorant Garamond.ttf');
		}

		@font-face {
			font-family: DMS;
			src: url('$lib/fonts/DMSans.ttf');
			font-weight: 100 900;
		}

		@font-face {
			font-family: Roboto;
			src: url('$lib/fonts/Roboto-Regular.ttf');
		}

		@font-face {
			font-family: RC;
			src: url('$lib/fonts/Roboto Condensed.ttf');
		}
	}
</style>
