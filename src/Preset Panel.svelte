<script>
	import { fade } from 'svelte/transition';
	import { onStart, presetCost, costPerCard, ss, bankBalance } from './shared.svelte';
	import TextButton from './Text Button.svelte';
	import { post } from './utils';
	import { BANK } from './const';
	import Slider from './Preset Slider.svelte';

	const onGo = () => {
		delete ss.buy;
		post(onStart, ss.preset ? 1000 : 0);
	};

	const cpc = $derived(costPerCard());
</script>

{#if ss.buy}
	<div class="panel" transition:fade>
		<div class="top spb">
			<span class="label">starting balance</span>
			<span style="font-size: 18px;">{'$' + BANK.toFixed(2)}</span>
		</div>
		<div class="mid">
			<div class="mid-top spb">
				<span class="label">pre-set cards</span>
				<span style="font-size: 13px;">{ss.preset}</span>
			</div>
			<Slider/>
			<div class="mid-bottom spb">
				<span></span>
				<span class="card-price">{cpc > 0 ? '$' + cpc + ' each' : ' '}</span>
			</div>
		</div>
		<div class="bottom">
			<div class="spb">
				<span class="label">pre-set cost</span>
				<span style="font-size: 16px;">{'$' + presetCost()}</span>
			</div>
		</div>
		{#if true}
			{@const red = bankBalance() < 0}
			{@const style = `font-size: 14px; width: 100%; margin-top: 1rem; padding: 0.5rem 0; background: var(--${red ? 'darkred' : 'button-background'});`}
			<TextButton id="tb-start" text={[red ? 'Already rankrupt' : 'Start']} framed {style} onClick={onGo} />
		{/if}
	</div>
{/if}

<style>
	.panel {
		grid-area: 2/1;
		place-self: center;
		z-index: 1;
		background: var(--preset-background);
		box-sizing: border-box;
		border: 1px solid #f5f0e080;
		border-radius: 10px;
		padding: 1.25rem 1.5rem;
		width: 260px;
		margin-bottom: 1.5rem;
		scale: 1.2;
	}

	.spb {
		display: grid;
		grid-auto-flow: column;
		justify-content: space-between;
	}

	.top {
		align-items: center;
		margin-bottom: 1rem;
	}

	.label {
		font-size: 13px;
		color: var(--supertitle);
	}

	.mid {
		margin-bottom: 0.75rem;
	}

	.mid-top {
		margin-bottom: 0.4rem;
	}

	.mid-bottom {
		margin-top: 0.25rem;
	}

	.card-price {
		font-size: 11px;
		color: var(--card-price);
	}

	.bottom {
		border-top: 0.5px solid var(--separator);
		padding-top: 0.75rem;
	}
</style>
