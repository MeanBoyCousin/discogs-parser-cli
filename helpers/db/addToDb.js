const fs = require('fs')

const addToDb = async (db, master) => {
    await db.run(
        `INSERT INTO releases (artists, genres, styles, year, title, videos, id)
    VALUES ('${master.artists}', 
            '${master.genres}', 
            '${master.styles}', 
            ${master.year}, 
            '${master.title}', 
            '${JSON.stringify(master.videos)}', 
            ${master.id});`,
        (err, data) => {
            if (err) fs.appendFileSync('./errorCatcher.xml', `${master.id} - ${err}\n`) // Print ID of release that threw to errorCatcher.xml for checking.
        }
    )
}

module.exports = addToDb
