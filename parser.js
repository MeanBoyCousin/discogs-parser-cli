const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const flow = require('xml-flow')

const dbAccess = require('./helpers/db/databaseAccess')
const clearAndClean = require('./helpers/db/dbClearClean')
const clearErrorCatcher = require('./helpers/util/clearErrorCatcher')
const progress = require('./helpers/console/progress')
const sanitise = require('./helpers/sanitise')
const videoStatusCheck = require('./helpers/videoStatusChecker')
const addToDb = require('./helpers/db/addToDb')
const complete = require('./helpers/console/complete')

inquirer
    .prompt([
        {
            name: 'action',
            type: 'list',
            message:
                'Do you wish to update the database or completely overwrite it? If you wish to overwrite, please create a backup copy first.',
            choices: ['update', 'overwrite']
        },
        {
            name: 'fileName',
            type: 'list',
            message: 'Please enter the file name of the Discogs XML file you wish to parse.',
            choices: fs.readdirSync(__dirname).filter(file => file.includes('.xml'))
        },
        {
            name: 'lines',
            type: 'number',
            message: 'Please enter the total amount of lines in the file.'
        },
        {
            name: 'start',
            type: 'number',
            message: 'Please enter the ID you wish to start at. If you wish to parse the whole file, enter 0.'
        }
    ])
    .then(async answers => {
        const db = await dbAccess.open('./rhythm-roulette.db')

        if (answers.action === 'overwrite') await clearAndClean(db) // Only runs on overwrite parse.

        clearErrorCatcher('./errorCatcher.xml')

        const bar = progress.start(answers.lines) // Init progress bar with amount of releases to parse from the CLI.

        const xmlInputFile = fs.createReadStream(path.join(__dirname, `./${answers.fileName}`))
        const xmlStream = flow(xmlInputFile)

        xmlStream.on('tag:master', async master => {
            if (master.videos !== undefined && master.year > 0 && master.$attrs.id > answers.start) {
                try {
                    master = sanitise(master)
                    master = await videoStatusCheck(master)
                    if (master.videos.length > 0) await addToDb(db, master)
                } catch (error) {
                    fs.appendFileSync('./errorCatcher.xml', `${master} - ${error.stack}\n`)
                    // Print ID of release that threw to errorCatcher.xml for checking.
                }
            }

            progress.update(bar, master)

            if (bar.value === answers.lines) {
                await complete(db)
                await dbAccess.close(db)
            }
        })
    })
    .catch(error => {
        if (error.isTtyError) {
            console.log(error.isTtyError)
        } else {
            console.log(error)
        }
    })
