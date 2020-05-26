const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const boxen = require('boxen');

const openDB = async path => {
    const db = await open({
        filename: path,
        driver: sqlite3.Database,
    });
    return db;
};

const closeDB = async db => {
    await db.close(err => {
        if (err) {
            return console.error(err.message);
        }
        console.log(
            boxen('Database closed.', {
                borderColor: 'green',
                borderStyle: 'round',
                dimBorder: true,
                padding: 1,
                margin: 1,
            })
        );
    });
};

module.exports = {
    open: openDB,
    close: closeDB,
};
