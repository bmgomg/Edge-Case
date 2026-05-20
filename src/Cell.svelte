<script>
	import Back from '$lib/images/Back.webp';
	import Club from '$lib/images/Club.webp';
	import Diamond from '$lib/images/Diamond.webp';
	import Heart from '$lib/images/Heart.webp';
	import Spade from '$lib/images/Spade.webp';
	import { fade } from 'svelte/transition';
	import { CARDS } from './Cards';
	import { CELL_MARGIN, CELL_WIDTH, DUR_MS } from './const';
	import { cellCode, drawNext, firstSuitRow, getValidTargets, isSolved, onOver, persist, rowCol, ss } from './shared.svelte';
	import { _sound } from './sound.svelte';
	import { clientRect, post } from './utils';

	const suits = [Heart, Club, Diamond, Spade];
	const { cell } = $props();
	const { id, code, placed } = $derived(cell);
	const tray = $derived(id < 0);
	let _this = $state(null);
	const { row, col } = $derived(rowCol(id - 1));
	const img = $derived(CARDS[+code]);

	const updateTargets = () => {
		if (ss.from) {
			ss.targets = getValidTargets(code, tray ? null : id - 1).map((i) => i + 1);
		} else {
			delete ss.targets;
		}
	};

	const onPointerDown = () => {
		_sound.play('click');

		if (ss.from === id) {
			delete ss.from;
			updateTargets();
			return;
		}

		if (!ss.from || tray) {
			if (code) {
				ss.from = id;
				updateTargets();
			}

			return;
		}

		if (code) {
			ss.from = id;
			updateTargets();
			return;
		}

		ss.to = id;
	};

	$effect(() => {
		const onTransitionEnd = (e) => {
			if (e.propertyName !== 'translate') {
				return;
			}

			if (ss.from !== id || !ss.to) {
				return;
			}

			_sound.play('cluck');

			if (code && code === cellCode(ss.to)) {
				const i = ss.to - 1;
				ss.cells[i].placed = true;
				post(() => (ss.cells[i].placed = false), 500);
			}

			let cob = ss.from < 0 ? ss.trayCell : ss.cells.find((c) => c.id === ss.from);
			const i = ss.to - 1;

			ss.cells[i].code = cob.code;
			cob.code = 0;

			delete ss.from;
			delete ss.to;

			updateTargets();

			const solved = isSolved();

			if (solved) {
				onOver('won');
				persist();
			} else if (tray) {
				if (cell !== ss.trayCell) {
					alert();
				}

				delete ss.trayCell;
				drawNext();
			}
		};

		_this.addEventListener('transitionend', onTransitionEnd);
		return () => _this.removeEventListener('transitionend', onTransitionEnd);
	});

	const off = $derived.by(() => {
		let r1, r2;

		if (ss.gather === 3 || ss.spread === 1) {
			if (tray) {
				return [0, 0];
			}

			r1 = clientRect('#cell-' + id);
			r2 = clientRect('#cell-tray');
		} else {
			if (!ss.from || !ss.to) {
				return [0, 0];
			}

			if (id !== ss.from && id !== ss.to) {
				return [0, 0];
			}

			r1 = clientRect('#cell-' + (ss.from < 0 ? 'tray' : ss.from));
			r2 = clientRect('#cell-' + ss.to);
		}

		const dx = r2.x - r1.x;
		const dy = r2.y - r1.y;

		return [dx / ss.scale, dy / ss.scale];
	});

	const zi = $derived(id === ss.from ? 1 : 0);
	const style = $derived(`grid-area: ${row}/${col}; width: ${CELL_WIDTH}px; margin: ${CELL_MARGIN}px;  z-index: ${zi};`);
	const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	const pulse = $derived(id === ss.from && !ss.to);
	const target = $derived(!tray && !code && ss.targets && ss.targets.includes(id));
	const disabled = $derived((!code && !target) || ss.to || (ss.slide && tray) || ss.over);
	const fsr = $derived(firstSuitRow());
	const classes = $derived(`cell ${disabled ? 'nope' : ''}`);
</script>

<div id={'cell-' + (tray ? 'tray' : id)} bind:this={_this} class={classes} {style} onpointerdown={onPointerDown}>
	{#if tray || ss.over !== 'won' || ss.gather}
		<div class="spot {tray ? 'tray-spot' : ''} {target ? 'target' : ''}" transition:fade>
			{#if row >= fsr && row <= fsr + 3}
				{#if col === 1}
					<img class="suit" src={suits[row - fsr]} alt="" width="40%" />
				{/if}
				{@const classes = `${col === 1 || col > 10 ? 'rank-a' : 'rank-n'}`}
				<div class={classes}>{tray ? '' : ranks[col - 1]}</div>
				{#if false}
					<div class="{classes} code">{tray ? '' : cellCode(id)}</div>
				{/if}
			{/if}
		</div>
	{/if}
	{#if placed}
		<div class="glow" transition:fade></div>
	{/if}
	{#if code}
		{#if tray && ss.slide === 'forward'}
			<img class="slide" src={Back} alt="" width="100%" />
		{:else if !tray && ss.spread}
			{@const classes = `card ${ss.spread === 3 ? 'flip-1' : ss.spread === 4 ? 'flip-2' : ''}`.trim()}
			{@const ms = ss.spread === 1 ? 0 : ss.spread === 2 ? 1000 : DUR_MS}
			{@const style = `translate: ${off[0]}px ${off[1]}px; transition-duration: ${ms}ms;`}
			<div class={classes} {style}>
				<img src={ss.spread < 4 ? Back : img} alt="" width="100%" />
			</div>
		{:else}
			{@const classes =
				`card ${ss.gather === 1 ? 'flip-1' : ss.gather ? 'flip-2' : ''} ${tray && ss.slide === 'back' ? 'slide-back' : ''} ${pulse ? 'pulse' : ''} ${ss.over === 'won' ? 'dance' : ''}`.trim()}
			{@const ms = ss.gather === 3 ? 1000 : tray ? DUR_MS : Math.min(Math.hypot(off[0], off[1]) * 10, DUR_MS)}
			{@const style = `translate: ${off[0]}px ${off[1]}px; transition-duration: ${ms}ms;`}
			<div class={classes} {style}>
				<img src={ss.gather > 1 || (tray && ss.spread < 4) ? Back : img} alt="" width="100%" />
			</div>
		{/if}
	{/if}
</div>

<style>
	.cell {
		display: grid;
		cursor: pointer;
	}

	.glow {
		grid-area: 1/1;
		border-radius: 5px;
		scale: 1.06;
		background: var(--card-glow);
		filter: drop-shadow(0 0 2px var(--card-glow));
	}

	.suit {
		grid-area: 1/1;
		opacity: 0.5;
		margin: 5px;
	}

	.rank-a,
	.rank-n {
		grid-area: 1/1;
		opacity: 0.25;
		place-self: center;
		font-family: Florentina;
		font-size: 28px;
	}

	.rank-a {
		font-family: EBG;
	}

	.rank-n {
		translate: 0 3px;
	}

	.code {
		translate: 0 30px;
		font-size: 14px;
	}

	.card,
	.spot {
		grid-area: 1/1;
		display: grid;
		aspect-ratio: 0.72;
		box-sizing: border-box;
		border-radius: 5px;
	}

	.card {
		place-content: center;
		background: var(--bone);
		display: grid;
	}

	.spot {
		border: 2px solid #ffffff28;
		transition:
			background-color 0.2s,
			border-color 0.5s;
	}

	.target {
		background: #00000050;
	}

	img {
		grid-area: 1/1;
	}

	.slide {
		animation: slide 0.4s forwards linear;
	}

	.slide-back {
		animation: slide-back 0.4s forwards linear;
	}

	@keyframes slide {
		50% {
			transform: translate(15px, 0);
		}
		100% {
			transform: translate(15px, 0) rotateY(90deg);
		}
	}

	@keyframes slide-back {
		0% {
			transform: translate(15px, 0) rotateY(90deg);
		}
		50% {
			transform: translate(15px, 0) rotateY(0deg);
		}
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
	}

	.pulse {
		animation: pulse 0.2s alternate infinite ease-in-out;
	}

	@keyframes pulse {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.05);
		}
	}

	.dance {
		animation: dance 2 0.5s 0.5s linear;
	}

	@keyframes dance {
		0% {
			rotate: z 0deg;
		}
		25% {
			rotate: z 5deg;
		}
		50% {
			rotate: z 0deg;
		}
		75% {
			rotate: z -5deg;
		}
		100% {
			rotate: z 0deg;
		}
	}

	.flip-1 {
		animation: flip-1 0.5s linear forwards;
	}

	.flip-2 {
		animation: flip-2 0.5s linear forwards;
	}

	@keyframes flip-1 {
		from {
			rotate: y 0deg;
		}
		to {
			rotate: y 90deg;
		}
	}

	@keyframes flip-2 {
		from {
			rotate: y 90deg;
		}
		to {
			rotate: y 0deg;
		}
	}
</style>
