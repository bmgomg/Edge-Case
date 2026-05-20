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
    return false;
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

    // if (deckCodes().length === 52) {
    //     newPuzzle();
    //     return;
    // }

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