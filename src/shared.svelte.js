import { APP_STATE, BANK } from './const';
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

export const isSolved = () => {
    return false;
};

export const rowCol = (i) => {
    const row = Math.floor(i / 5) + 1;
    const col = (i % 5) + 1;
    return { row, col };
};

export const cellCode = (id) => {
    if (id < 14 || id > 65) {
        return 0;
    }

    const { row, col } = rowCol(id - 1);
    return (row - 1) * 100 + col;
};

const makePuzzle = () => {
    delete ss.from;
    delete ss.to;
    delete ss.targets;
    delete ss.over;

    ss.ticks = 0;

    ss.cells = Array(ss.cellCount).fill(null).map((_, index) => ({ code: 0, id: index + 1 }));
    ss.buy = true;

    delete ss.trayCell;
};

export const onStart = () => {
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
