import { APP_STATE, BANK } from './const';
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
    const json = JSON.stringify({ ...stats, cells: ss.cells, over: ss.over });
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
        stats.solved = job.solved;
        stats.total = job.total;
        stats.best = job.best;

        ss.cells = job.over ? null : job.cells;
        ss.ticks = job.over ? 0 : job.ticks;
    } else {
        stats.plays = 0;
        stats.solved = 0;
        stats.total = 0;
        stats.best = 0;
    }
};

export const isSolved = () => {
    return false;
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
    delete ss.over;
    delete ss.buyUnused;
    delete ss.showUnused;
    delete ss.guess;
    delete ss.buyOp;

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
    post(() => _sound.play(over), 400);
    ss.over = over;

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

    if (!_sound.musicPlayed) {
        post(() => _sound.playMusic(), 1000);
    }

    delete ss.home;
};

export const aveScore = () => stats.plays ? (stats.total / stats.plays).toFixed(2) : 0;

export const bankBalance = () => BANK;
