const fs = require('fs')
const boxen = require('boxen')

const clearErrorCatcher = path => {
    fs.writeFileSync(path, 'IDs of releases that threw an error.\n\n')
    console.log(
        boxen('Clearing errorCatcher.xml', {
            borderColor: 'red',
            borderStyle: 'round',
            dimBorder: true,
            padding: 1,
            margin: 1
        })
    )
}

module.exports = clearErrorCatcher
