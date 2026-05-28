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

<div class="{ss.vert ? 'selector-v' : 'selector'} no-highlight">
	<div class="label">MUSIC</div>
	<SoundSlider max={3} value={_sound.music} {onInput} />
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
