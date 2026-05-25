import { APP_STATE, BANK, COST_ADD, COST_MULTIPLY, COST_SUBTRACT, OP_ADD, OP_MULTIPLY } from './const';
import { _sound } from './sound.svelte';
import { _range, post, shuffleInPlace } from './utils';

export const ss = $state({
    home: true,
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
    const json = JSON.stringify({ ...stats, cells: ss.cells, balance: ss.balance, showUnused: ss.showUnused, over: ss.over });
    localStorage.setItem(ss.appKey, json);
};

export const loadCommon = () => {
    const json = localStorage.getItem(APP_STATE);
    const job = JSON.parse(json);

    if (job) {
        _sound.sfx = job.sfx;
        _sound.music = job.music;
    }
};

export const loadGame = () => {
    delete ss.cells;

    const json = localStorage.getItem(ss.appKey);
    const job = JSON.parse(json);

    if (job) {
        stats.plays = job.plays;
        stats.solved = job.solved;
        stats.total = job.total;
        stats.best = job.best;

        if (!job.over) {
            ss.cells = job.cells;
            ss.balance = job.balance;
            ss.showUnused = job.showUnused;
        }
    } else {
        stats.plays = 0;
        stats.solved = 0;
        stats.total = 0;
        stats.best = 0;
    }
};

export const rowCol = (i) => {
    const row = Math.floor(i / 5) + 1;
    const col = (i % 5) + 1;
    return { row, col };
};

const makeCell = (i, nums) => {
    const id = i + 1;
    const { row, col } = rowCol(i);

    const cell = { id, row, col };

    if (row === 1 || col === 1) {
        cell.value = nums.shift();
    }

    return cell;
};

const makePuzzle = () => {
    _sound.play('dice');

    delete ss.over;
    delete ss.buyUnused;
    delete ss.showUnused;
    delete ss.guessing;
    delete ss.buyOp;
    delete ss.showPenalty;

    ss.balance = BANK;

    const nums = shuffleInPlace(_range(1, 9));
    ss.cells = Array(25).fill(null).map((_, i) => makeCell(i, nums));
};

export const onStart = () => {
    //
};

export const resetStats = () => {
    stats.plays = 0;
    stats.solved = 0;
    stats.total = 0;
    stats.best = 0;
};

export const onRestart = () => {
    if (!ss.over) {
        resetStats();
    }

    makePuzzle();
};

export const onOver = (over) => {
    _sound.play(over === 'surrender' ? 'draw' : over);
    ss.over = over;

    if (over === 'surrender') {
        edgeCells().forEach((c) => delete c.incorrect);
        resetStats();

        return;
    }

    ss.prevAverage = aveScore();

    stats.plays += 1;
    stats.solved += 1;

    stats.total += ss.balance;

    if (ss.balance > stats.best) {
        stats.best = ss.balance;
    }
};

export const onPlayOrResume = () => {
    if (!ss.cells || ss.over) {
        makePuzzle();
    }

    if (!_sound.musicPlayed) {
        post(() => _sound.playMusic(), 1000);
    }

    delete ss.home;
};

export const aveScore = () => stats.plays ? (stats.total / stats.plays).toFixed(2) : 0;

export const opCost = (op) => op ? op === OP_MULTIPLY ? COST_MULTIPLY : op === OP_ADD ? COST_ADD : COST_SUBTRACT : 0;

export const edgeCells = () => ss.cells ? ss.cells.filter((c, i) => i > 0 && (c.row === 1 || c.col === 1)) : [];

export const guessedAll = () => edgeCells().every((c) => c.guess);

export const isSolved = () => edgeCells().every((c) => c.guess === c.value);

export const someIncorrect = () => edgeCells().some((c) => c.incorrect);

export const canSubmit = () => {
    if (ss.over || ss.buyUnused || ss.buyOp || ss.guessing || ss.showPenalty) {
        return false;
    }

    if (someIncorrect()) {
        return false;
    }

    return guessedAll();
};
