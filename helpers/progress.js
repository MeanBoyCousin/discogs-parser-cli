const boxen = require('boxen');
const cliProgress = require('cli-progress');
const _colors = require('colors');

const startProgressBar = lines => {
    console.log(
        boxen('Starting parser...', {
            borderColor: 'yellow',
            borderStyle: 'round',
            dimBorder: true,
            padding: 1,
            margin: 1,
        })
    );

    const bar = new cliProgress.SingleBar(
        {
            format: `[{bar}] ${_colors.yellow('{percentage}%')} | Completed: ${_colors.yellow(
                '{value}/{total}'
            )} | Elapsed: ${_colors.yellow('{duration_formatted}')} | Remaining: ${_colors.yellow(
                '{eta_formatted}'
            )} | Current release ID: ${_colors.yellow('{id}')}`,
            etaBuffer: 10000,
            fps: 60,
            stopOnComplete: true,
        },
        cliProgress.Presets.shades_classic
    );

    bar.start(lines, 0, {
        id: 0,
    });

    return bar;
};

const updateAndIncrement = (bar, master) => {
    bar.update({
        id: master.id, // Included for fault finding troublesome releases.
    });

    bar.increment(); // Increment bar for each release.
};

module.exports = {
    start: startProgressBar,
    update: updateAndIncrement,
};
