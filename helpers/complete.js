const boxen = require('boxen')

const complete = db => {
    const sql = 'SELECT count(*) FROM releases;'

    db.all(sql, (err, rows) => {
        console.log(boxen(`Parsing complete - ${rows[0]['count(*)']} releases added to the database.`, {
            borderColor: 'green',
            borderStyle: 'round',
            dimBorder: true,
            padding: 1,
            margin: 1
        }))
    })
}

module.exports = complete
