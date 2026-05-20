<script>
	import { ss } from './shared.svelte';

	let _this = $state();

	const onMyInput = () => {
		const min = _this.min || 0;
		const max = _this.max || 100;
		const value = ((_this.value - min) * 100) / (max - min);
		_this.style.setProperty('--value', `${value}%`);
	};

	$effect(onMyInput);
</script>

<input bind:this={_this} class="slider" type="range" min="0" max="20" bind:value={ss.preset} oninput={onMyInput} />

<style>
	.slider {
		--value: 0%;
		--fill: var(--supertitle);
		--track: var(--slider-track);
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 4px;
		border-radius: 2px;
		background: linear-gradient(to right, var(--fill) 0%, var(--fill) var(--value), var(--track) var(--value), var(--track) 100%);
		outline: none;
		cursor: pointer;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: 2px solid var(--supertitle);
		background: var(--preset-background);
		transition: transform 0.15s;
	}

	input[type='range']:hover::-webkit-slider-thumb {
		transform: scale(1.1);
	}

	.slider::-moz-range-thumb {
		width: 18px;
		height: 18px;
		background: var(--preset-background);
		cursor: pointer;
	}
</style>
