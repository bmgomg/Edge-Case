import { shuffle } from 'lodash-es';
import { CARDS } from './Cards';
import { APP_STATE, BANK, COST_PER_MIN, MAX_DEBT, TICK_MS } from './const';
import { _sound } from './sound.svelte';
import { post } from './utils';

export const ss = $state({
    home: true,
    preset: 10,
});

export const stats = $state({
    plays: 0,
    solved: 0,
    total: 0,
    best: 0,
});

export const _log = (value) => console.log($state.snapshot(value));

export const persistCommon = () => {
    const json = JSON.stringify({ sfx: _sound.sfx, music: _sound.music });
    localStorage.setItem(APP_STATE, json);
};

export const persist = () => {
    const json = JSON.stringify({ ...stats, preset: ss.preset, cells: ss.cells, trayCell: ss.trayCell, ticks: ss.ticks, over: ss.over });
    localStorage.setItem(ss.appKey, json);
};

export const loadCommon = () => {
    const json = localStorage.getItem(APP_STATE);
    const job = JSON.parse(json);

    if (job) {
        _sound.sfx = job.sfx;
        _log(_sound.music);
        _sound.music = job.music;
    }
};

export const loadGame = () => {
    delete ss.cells;

    const json = localStorage.getItem(ss.appKey);
    const job = JSON.parse(json);

    if (job) {
        stats.plays = job.plays;
        stats.total = job.total;
        stats.best = job.best;

        ss.preset = job.preset;
        ss.cells = job.over ? null : job.cells;
        ss.trayCell = job.over ? null : job.trayCell;
        ss.ticks = job.over ? 0 : job.ticks;
    } else {
        stats.plays = 0;
        stats.total = 0;
        stats.best = 0;
    }
};

const decode = card => ({ suite: Math.floor(card / 100), rank: card % 100 });

export const isSolved = () => {
    const keys = Object.keys(CARDS).map(k => +k);
    const codes = ss.cells.filter(c => c.id > 13 && c.id < 66).map(c => c.code);

    return JSON.stringify(keys) === JSON.stringify(codes);
};

export const rowCol = (i) => {
    if (i < 0) {
        return { row: 1, col: 1 };
    }

    const row = Math.floor(i / ss.cols) + 1;
    const col = (i % ss.cols) + 1;
    return { row, col };
};

export const cellCode = (id) => {
    if (id < 14 || id > 65) {
        return 0;
    }

    const { row, col } = rowCol(id - 1);
    return (row - 1) * 100 + col;
};

// --- Placement helpers -----------------------------------------------------------

const isTableConnected = (codes, cols, cellCount) => {
    const occupied = [];
    for (let i = 0; i < cellCount; i++) {
        if (codes[i]) occupied.push(i);
    }
    if (occupied.length <= 1) return true;

    const occupiedSet = new Set(occupied);
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const visited = new Set([occupied[0]]);
    const queue = [occupied[0]];

    while (queue.length) {
        const idx = queue.shift();
        const row = Math.floor(idx / cols);

        for (const offset of [-cols, cols, -1, 1]) {
            const nIdx = idx + offset;
            if (nIdx < 0 || nIdx >= cellCount) continue;
            if (offset === 1 && Math.floor(nIdx / cols) !== row) continue;
            if (offset === -1 && Math.floor(nIdx / cols) !== row) continue;
            if (occupiedSet.has(nIdx) && !visited.has(nIdx)) {
                visited.add(nIdx);
                queue.push(nIdx);
            }
        }
    }

    return visited.size === occupied.length;
};

// Pure core: works on any plain codes array (0 = empty).
const targetsForCodes = (codes, selectedCode, cols, cellCount) => {
    const tableIndices = [];
    for (let i = 0; i < cellCount; i++) {
        if (codes[i]) tableIndices.push(i);
    }

    // No cards on table yet — every cell is open
    if (tableIndices.length === 0) {
        return Array.from({ length: cellCount }, (_, i) => i);
    }

    const { suite: selSuite, rank: selRank } = decode(selectedCode);

    // Candidate spots: empty cells orthogonally adjacent to at least one occupied cell
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const candidates = new Set();
    for (const idx of tableIndices) {
        const row = Math.floor(idx / cols);
        for (const offset of [-cols, cols, -1, 1]) {
            const nIdx = idx + offset;
            if (nIdx < 0 || nIdx >= cellCount) continue;
            if (offset === 1 && Math.floor(nIdx / cols) !== row) continue;
            if (offset === -1 && Math.floor(nIdx / cols) !== row) continue;
            if (!codes[nIdx]) candidates.add(nIdx);
        }
    }

    const valid = [];

    for (const candIdx of candidates) {
        const candRow = Math.floor(candIdx / cols);

        // Every occupied neighbor must be compatible (same suit or rank)
        let compatible = true;
        for (const offset of [-cols, cols, -1, 1]) {
            const nIdx = candIdx + offset;
            if (nIdx < 0 || nIdx >= cellCount) continue;
            if (offset === 1 && Math.floor(nIdx / cols) !== candRow) continue;
            if (offset === -1 && Math.floor(nIdx / cols) !== candRow) continue;
            const nCode = codes[nIdx];
            if (!nCode) continue;
            const { suite: nSuite, rank: nRank } = decode(nCode);
            if (selSuite !== nSuite && selRank !== nRank) { compatible = false; break; }
        }
        if (!compatible) continue;

        // Placing here must keep all table cards in one connected group
        codes[candIdx] = selectedCode;
        const connected = isTableConnected(codes, cols, cellCount);
        codes[candIdx] = 0;

        if (connected) valid.push(candIdx);
    }

    return valid;
};

// Returns flat cell indices where selectedCode can legally be placed.
// selectedIndex is the card's current cell index if it's on the table, or null if from the tray.
export const getValidTargets = (selectedCode, selectedIndex = null) => {
    const { cells, cols, cellCount } = ss;
    const codes = cells.map(c => c.code);
    if (selectedIndex !== null) codes[selectedIndex] = 0;
    return targetsForCodes(codes, selectedCode, cols, cellCount);
};

// Picks randomly from the subset of `pool` whose score (returned by `scoreFn`) is lowest.
const pickSparse = (pool, scoreFn) => {
    let min = Infinity;
    for (const item of pool) {
        const s = scoreFn(item);
        if (s < min) min = s;
    }
    const thin = pool.filter(item => scoreFn(item) === min);
    return thin[Math.floor(Math.random() * thin.length)];
};

// Pre-populates n cards onto the table.
// placed → cards sit at their target (solved) positions; a blob is grown from a random seed.
//          false → cards are chosen from a shuffled deck and dropped at a random valid spot.
// spread → prefer candidates/spots with the fewest existing neighbors, producing a more
//          spread-out layout instead of a compact blob.
// n can be anything from 0–52.
// Returns a flat codes array (0 = empty) ready to be applied to ss.cells.
const generateInitialSetup = (n, placed = true, spread = true) => {
    const { cols, cellCount } = ss;
    const codes = new Array(cellCount).fill(0);
    const count = Math.max(0, Math.min(n, 52));
    if (count === 0) return codes;

    const allCodes = Object.keys(CARDS).map(k => +k);
    const pick = (pool) => pool[Math.floor(Math.random() * pool.length)];

    if (placed) {
        // Target cell index for a card at its solved position
        const targetIndex = code => {
            const suite = Math.floor(code / 100);
            const rank = code % 100;
            return suite * cols + (rank - 1);
        };

        // Cards adjacent to a given card in the solved grid (same rank ± 1 suit, same suit ± 1 rank)
        const gridNeighbors = code => {
            const suite = Math.floor(code / 100);
            const rank = code % 100;
            const nb = [];
            if (rank > 1) nb.push(suite * 100 + rank - 1);   // left  (same suit, lower rank)
            if (rank < 13) nb.push(suite * 100 + rank + 1);   // right (same suit, higher rank)
            if (suite > 1) nb.push((suite - 1) * 100 + rank); // up    (lower suit, same rank)
            if (suite < 4) nb.push((suite + 1) * 100 + rank); // down  (higher suit, same rank)
            return nb;
        };

        // Grow a connected set of `count` cards from a random seed
        // eslint-disable-next-line svelte/prefer-svelte-reactivity
        const selected = new Set();
        // eslint-disable-next-line svelte/prefer-svelte-reactivity
        const frontier = new Set();

        const seed = allCodes[Math.floor(Math.random() * allCodes.length)];
        selected.add(seed);
        gridNeighbors(seed).forEach(nb => frontier.add(nb));

        while (selected.size < count && frontier.size > 0) {
            const pool = [...frontier];
            // spread: prefer frontier cards that touch fewest already-selected cards
            const chosen = spread
                ? pickSparse(pool, code => gridNeighbors(code).filter(nb => selected.has(nb)).length)
                : pick(pool);
            frontier.delete(chosen);
            selected.add(chosen);
            gridNeighbors(chosen).forEach(nb => { if (!selected.has(nb)) frontier.add(nb); });
        }

        for (const code of selected) {
            codes[targetIndex(code)] = code;
        }
    } else {
        // Count occupied orthogonal neighbors of a cell index in the current codes array
        const occupiedNeighbors = idx => {
            const row = Math.floor(idx / cols);
            let cnt = 0;
            for (const offset of [-cols, cols, -1, 1]) {
                const nIdx = idx + offset;
                if (nIdx < 0 || nIdx >= cellCount) continue;
                if (offset === 1 && Math.floor(nIdx / cols) !== row) continue;
                if (offset === -1 && Math.floor(nIdx / cols) !== row) continue;
                if (codes[nIdx]) cnt++;
            }
            return cnt;
        };

        // Place cards from a shuffled deck at valid spots
        const deck = shuffle(allCodes);
        let tally = 0;

        for (let i = 0; i < deck.length && tally < count; i++) {
            const code = deck[i];
            const spots = targetsForCodes(codes, code, cols, cellCount);
            if (!spots.length) continue;

            // spread: prefer spots that touch fewest occupied cells
            const spotIdx = spread ? pickSparse(spots, occupiedNeighbors) : pick(spots);
            codes[spotIdx] = code;
            tally++;
        }
    }

    return codes;
};

export const deckCodes = () => Object.keys(CARDS).map(k => +k).filter(code => ss.trayCell?.code !== code && !ss.cells?.some(c => c.code === code));

export const drawNext = () => {
    const deck = shuffle(deckCodes());

    if (!deck.length) {
        return;
    }

    _sound.play('link1');

    // delay for sound
    post(() => {
        const code = deck.find(c => getValidTargets(c, null).length);
        ss.trayCell = { code: code || deck[0], id: -1 };

        ss.slide = 'forward';

        post(() => {
            _sound.play('link2');
            ss.slide = 'back';
        }, 400);

        post(() => delete ss.slide, 800);
    }, 200);
};

const makePuzzle = () => {
    delete ss.from;
    delete ss.to;
    delete ss.targets;
    delete ss.over;

    stopTimer();
    ss.ticks = 0;

    ss.cells = Array(ss.cellCount).fill(null).map((_, index) => ({ code: 0, id: index + 1 }));
    ss.buy = true;

    delete ss.trayCell;
};

export const onStart = () => {
    const codes = generateInitialSetup(ss.preset);

    ss.spread = 1;

    post(() => {
        codes.forEach((code, i) => {
            if (code) {
                ss.cells[i].code = code;
            }
        });

        post(() => {
            ss.spread = 2;

            post(() => {
                ss.spread = 3;  // flip half-way

                post(() => {
                    ss.spread = 4; // complete flip
                    post(() => delete ss.spread, 500);
                }, 500);

                drawNext();
            }, ss.preset ? 1000 : 0);
        });

        startTimer();
    });

    _sound.play('dice');
};

const onTick = () => {
    if (ss.home) {
        return;
    }

    ss.ticks += 1;

    if (bankBalance() <= MAX_DEBT) {
        onOver('lost');
    }

    persist();
};

export const resetStats = () => {
    stats.plays = 0;
    stats.total = 0;
    stats.best = 0;
};

export const onRestart = () => {
    if (!ss.over) {
        stopTimer();
        resetStats();
    }

    const newPuzzle = () => {
        for (const cell of ss.cells) {
            cell.code = 0;
        }

        post(makePuzzle);
    };

    ss.ticks = 0;

    if (deckCodes().length === 52) {
        newPuzzle();
        return;
    }

    ss.gather = 1;

    post(() => {
        ss.gather = 2;

        post(() => _sound.play('link2', { rate: 0.5 }), 200);

        post(() => {
            ss.gather = 3;

            post(() => {
                delete ss.gather;
                newPuzzle();
            }, 1000);
        }, 500);
    }, 500);
};

export const onOver = (over) => {
    post(() => _sound.play(over), 400);
    ss.over = over;
    stopTimer();

    if (over === 'lost') {
        resetStats();
        return;
    }

    ss.prevAverage = aveScore();
    stats.plays += 1;

    const balance = bankBalance();
    stats.total += balance;

    if (balance > stats.best) {
        stats.best = balance;
    }
};

export const onPlayOrResume = () => {
    if (!ss.cells || ss.over) {
        makePuzzle();
    }

    if (ss.ticks && !ss.over) {
        startTimer();
    }

    if (!_sound.musicPlayed) {
        post(() => _sound.playMusic(), 1000);
    }

    delete ss.home;
};

const startTimer = () => {
    post(() => {
        onTick();
        ss.timer = setInterval(onTick, TICK_MS);
    }, 2000);
};

export const stopTimer = () => {
    clearInterval(ss.timer);
    delete ss.timer;
};

export const firstSuitRow = () => (ss.rows - 4) / 2 + 1;

export const elapsedSecs = () => Math.round(((ss.ticks || 0) * TICK_MS) / 1000);

export const moneySpent = () => elapsedSecs() / 60 * COST_PER_MIN;

export const costPerCard = () => (ss.preset * 0.05).toFixed(2);

export const presetCost = () => (ss.preset * costPerCard()).toFixed(2);

export const bankBalance = () => BANK - presetCost() - moneySpent();

export const aveScore = () => stats.plays ? (stats.total / stats.plays).toFixed(2) : 0;