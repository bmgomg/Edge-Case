<script>
	import { _sound } from './sound.svelte';
	import { post } from './utils';

	const { id, text, framed, style, disabled, sound = true, onClick } = $props();

	let scale = $state(1);
	let timer = $state(false);

	const classes = $derived.by(() => {
		return `button-base no-highlight button ${framed ? 'framed' : 'text-only'} ${onClick ? '' : 'nope'} ${disabled ? (framed ? 'disabled' : 'text-only-disabled') : ''}`;
	});

	const _style = $derived(`${style}; transform: scale(${scale})`);

	$effect(() => {
		const onTransitionEnd = (e) => {
			if (e.target.id !== id) {
				return;
			}

			if (e.propertyName !== 'transform') {
				return;
			}

			if (scale < 1) {
				scale = 1;
			} else {
				post(onClick);
			}
		};

		window.addEventListener('transitionend', onTransitionEnd);
		return () => window.removeEventListener('transitionend', onTransitionEnd);
	});

	const onPointerDown = () => {
		if (timer) {
			return;
		}

		if (sound) {
			_sound.play('tap');
		}

		scale = 0.85;
		timer = post(() => (timer = null), 500);
	};
</script>

<div {id} class={classes} onpointerdown={onPointerDown} style={_style} role="button" tabindex={disabled ? -1 : 0}>
	{#each text as line, i (i)}
		<div>{line}</div>
	{/each}
</div>

<style>
	.button {
		place-self: center;
		display: grid;
		place-items: center;
		transition:
			transform 0.1s,
			color 0.3s,
			background-color 0.2s,
			filter 0.2s;
		cursor: pointer;
		box-sizing: border-box;
		white-space: nowrap;
	}

	.text-only {
		font-size: 14px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--gold);
		opacity: 0.85;
		place-items: center;
	}

	.text-only:hover {
		opacity: 1;
		filter: none; /* drop the sepia hover — looks dated next to brass */
	}

	.text-only-disabled {
		cursor: initial;
		pointer-events: none;
		color: rgba(244, 234, 214, 0.4);
		filter: grayscale(0.6) brightness(0.7);
	}

	.framed {
		box-sizing: border-box;
		font-family: Cinzel;
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		padding: 0.5rem 2rem;
		color: var(--button-color);
		background: var(--button-background);
		border: 1px solid var(--gold-deep);
		box-shadow:
			0 2px 6px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(244, 234, 214, 0.45),
			inset 0 -2px 4px rgba(106, 84, 36, 0.55);
	}

	.framed:hover {
		filter: brightness(1.08);
	}

	.disabled {
		pointer-events: none;
		background: #0000;
		color: #bfb39a60;
		border: 1px solid #bfb39a60;
		box-shadow: none;
		filter: grayscale(1);
	}

	.button:focus {
		outline: none !important;
	}
</style>
