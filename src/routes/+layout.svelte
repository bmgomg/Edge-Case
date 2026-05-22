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
			--bone: #f4ead6; /* bone / card faces / instruction text */
			--bone-dim: #bfb39a; /* new — sub-emphasis body text */
			--dash: #a07e36;
			--subtitle: #a07e36;
			--deep-purple: #191b31; /* deeper felt for panels */
			--separator: #6a5424; /* now a faded-gold rule */
			--button-background: linear-gradient(180deg, #f3d27a 0%, #d6b264 50%, #a07e36 100%);
			--button-color: #051710; /* new — text on the brass button */
			--background: #0e3a2c;
			--slider-track: #a07e3680;
			--card-glow: #f3d27a; /* brighter gold halo on solved cards */
			--red: #c1302a;
			--darkred: #7d2222;
			--instr-text: #f4ead6; /* was minty; now bone */
			--gold: #f3d27a;
			--gold-dim: #d6b264; /* was light green; now gold */
			--gold-deep: #a07e36; /* new — frame inset, label color */
			--water: #082319; /* deck-counter readout (was navy) */
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

		@font-face {
			font-family: CP;
			src: url('$lib/fonts/CrimsonPro.ttf');
			/* font-weight: 100 900; */
		}
	}
</style>
