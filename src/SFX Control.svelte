<script>
	import SoundSlider from './Sound Slider.svelte';
	import { persistCommon } from './shared.svelte';
	import { _sound } from './sound.svelte';

	const onInput = (e) => {
		_sound.sfx = +e.target.value;

		if (_sound.sfx) {
			_sound.play('won', { rate: 4 });
		}

		persistCommon();
	};
</script>

<div class="selector no-highlight">
	<div class="label">SFX</div>
	<SoundSlider max={1} value={_sound.sfx} {onInput} style="width: 35%" />
</div>

<style>
	.selector {
		display: grid;
		grid-auto-flow: column;
		gap: 12px;
		align-items: center;
		translate: 60px 0;
	}
</style>
