const boxen = require('boxen')
const path = require('path')

const complete = async db => {
    await db.get('SELECT count(*) FROM releases;').then(data => {
        console.log(
            boxen(`Parsing complete - ${data['count(*)']} releases added to the database.`, {
                borderColor: 'green',
                borderStyle: 'round',
                dimBorder: true,
                padding: 1,
                margin: 1
            })
        )

        console.log(
            boxen(`Errors can be found at - ${path.join(__dirname, '/../errorCatcher.xml')}`, {
                borderColor: 'red',
                borderStyle: 'round',
                dimBorder: true,
                padding: 1,
                margin: 1
            })
        )
    })
}

module.exports = complete
