const sqlite3 = require('sqlite3').verbose()
const boxen = require('boxen')

const openDB = (path) => {
    const db = new sqlite3.Database(path, (err) => {
        if (err) {
            return console.error(err.message)
        }
    })
    return db
}

const closeDB = (db) => {
    db.close((err) => {
        if (err) {
            return console.error(err.message)
        }
        console.log(boxen('Database closed.', {
            borderColor: 'green',
            borderStyle: 'round',
            dimBorder: true,
            padding: 1,
            margin: 1
        }))
    })
}

module.exports = {
    open: openDB,
    close: closeDB
}
