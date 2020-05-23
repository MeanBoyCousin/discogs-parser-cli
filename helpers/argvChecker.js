const boxen = require('boxen');

const argvChecker = (path, amount) => {
    if (amount === undefined || path === undefined) {
        console.log(
            boxen(`Error: Path and amount of releases unspecified.\nExpected: 'node parser <file.xml> <int>'`, {
                borderColor: 'red',
                borderStyle: 'round',
                dimBorder: true,
                padding: 1,
                margin: 1,
            })
        );
        process.exit();
    }
};

module.exports = argvChecker;
