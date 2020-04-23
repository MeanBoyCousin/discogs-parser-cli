const cliProgress = require('cli-progress');
const _colors = require('colors');

const startProgressBar = lines => {
    const bar = new cliProgress.SingleBar({
        format: `[{bar}] ${_colors.yellow('{percentage}%')} | Completed: ${_colors.yellow('{value}/{total}')} | Elapsed: ${_colors.yellow('{duration_formatted}')} | Remaining: ${_colors.yellow('{eta_formatted}')} | Current release ID: ${_colors.yellow('{id}')}`,
        etaBuffer: 100,
        fps: 60,
        stopOnComplete: true
    }, cliProgress.Presets.shades_classic);

    bar.start(lines, 0, {
        id: 0
    });

    return bar
}

const updateAndIncrement = (bar, master) => {
    bar.update({
        id: master['$attrs'].id // Included for fault finding troublesome releases.
    })

    bar.increment() // Increment bar for each release.
}

module.exports = {
    start: startProgressBar,
    update: updateAndIncrement
}
