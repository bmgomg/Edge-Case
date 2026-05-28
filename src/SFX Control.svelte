<script>
	import SoundSlider from './Sound Slider.svelte';
	import { persistCommon, ss } from './shared.svelte';
	import { _sound } from './sound.svelte';

	const onInput = (e) => {
		_sound.sfx = +e.target.value;

		if (_sound.sfx) {
			_sound.play('won', { rate: 4 });
		}

		persistCommon();
	};
</script>

<div class="{ss.vert ? 'selector-v' : 'selector'} no-highlight">
	<div class="label">SFX</div>
	<SoundSlider max={1} value={_sound.sfx} {onInput} style="width: 35%" />
</div>

<style>
	.selector, .selector-v {
		display: grid;
		grid-auto-flow: column;
		gap: 12px;
		align-items: center;
		translate: 60px 0;
	}

	.selector-v {
		translate: 0;
	}

	.label {
		font-size: 14px;
		letter-spacing: 0.22em;
	}
</style>
