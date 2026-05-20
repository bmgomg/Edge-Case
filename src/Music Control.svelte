<script>
	import SoundSlider from './Sound Slider.svelte';
	import { persistCommon } from './shared.svelte';
	import { _sound } from './sound.svelte';

	const onInput = (e) => {
		_sound.music = +e.target.value;
		_sound.playMusic();

		persistCommon();
	};
</script>

<div class="selector no-highlight">
	<div class="label">MUSIC</div>
	<SoundSlider max={3} value={_sound.music} {onInput} />
</div>

<style>
	.selector {
		display: grid;
		grid-auto-flow: column;
		gap: 12px;
		align-items: center;
		translate: 60px 0;
	}

	.label {
		font-size: 14px;
		letter-spacing: 0.22em;
	}
</style>
