<script>
	import SoundSlider from './Sound Slider.svelte';
	import { persistCommon, ss } from './shared.svelte';
	import { _sound } from './sound.svelte';

	const onInput = (e) => {
		_sound.music = +e.target.value;
		_sound.playMusic();

		persistCommon();
	};
</script>

<div class="selector {ss.vert ? 'selector-v' : ''} no-highlight">
	<div class="label">MUSIC</div>
	<SoundSlider max={3} value={_sound.music} {onInput} />
</div>

<style>
	.selector {
		display: grid;
		gap: 12px;
		align-items: center;
	}

	.selector-v {
		grid-auto-flow: column;
	}

	.label {
		font-size: 14px;
		letter-spacing: 0.22em;
	}
</style>
