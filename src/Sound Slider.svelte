<script>
	const { min = 0, max, value, onInput, style } = $props();

	let _this = $state();

	const onMyInput = (e) => {
		const v = ((value - min) * 100) / (max - min);
		_this.style.setProperty('--value', `${v}%`);

		if (e) {
			onInput(e);
		}
	};

	$effect(onMyInput);
</script>

<input bind:this={_this} class="slider" type="range" {value} {min} {max} oninput={onMyInput} {style} />

<style>
	.slider {
		--value: 0%;
		--fill: var(--gold-dim);
		--track: var(--slider-track);
		-webkit-appearance: none;
		appearance: none;
		height: 3px;
		border-radius: 1.5px;
		background: linear-gradient(to right, var(--fill) 0%, var(--fill) var(--value), var(--track) var(--value), var(--track) 100%);
		outline: none;
		cursor: pointer;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		border: 2px solid var(--gold-dim);
		background: var(--preset-background);
		transition: transform 0.15s;
	}

	input[type='range']:hover::-webkit-slider-thumb {
		transform: scale(1.1);
	}

	.slider::-moz-range-thumb {
		width: 13px;
		height: 13px;
		background: var(--preset-background);
		cursor: pointer;
	}
</style>
