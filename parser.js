const fs = require('fs');
const path = require('path');
const flow = require('xml-flow');
const xmlInputFile = fs.createReadStream(path.join(__dirname, process.argv[2]));
const xmlStream = flow(xmlInputFile);
const argvChecker = require('./helpers/argvChecker');
const dbAccess = require('./helpers/databaseAccess');
const clearAndClean = require('./helpers/dbClearClean');
const clearErrorCatcher = require('./helpers/clearErrorCatcher');
const progress = require('./helpers/progress');
const sanitise = require('./helpers/sanitise');
const addToDb = require('./helpers/addToDb');
const complete = require('./helpers/complete');

argvChecker(process.argv[2], process.argv[3]);

const db = dbAccess.open('./rhythm-roulette.db');

clearAndClean(db);

clearErrorCatcher('./errorCatcher.xml');

const bar = progress.start(process.argv[3]); // Init progress bar with amount of releases to parse from the CLI.

xmlStream.on('tag:master', master => {
    progress.update(bar, master);

    if (master.videos !== undefined && master.year > 0) {
        try {
            master = sanitise(master);

            addToDb(db, master);
        } catch (error) {
            fs.appendFileSync('./errorCatcher.xml', `${master.$attrs.id} - ${error.stack}\n`);
            // Print ID of release that threw to errorCatcher.xml for checking.
        }
    }

    if (bar.value.toString() === process.argv[3]) {
        complete(db);
        dbAccess.close(db);
    }
});
