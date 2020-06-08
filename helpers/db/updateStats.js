const boxen = require('boxen')

const reduceToUnique = array => {
    return array.reduce((acc, curr) => {
        if (acc.indexOf(curr) === -1) acc.push(curr)
        return acc
    }, [])
}

const updateStats = async db => {
    console.log(
        boxen('Updating stats table...', {
            borderColor: 'yellow',
            borderStyle: 'round',
            dimBorder: true,
            padding: 1,
            margin: 1
        })
    )

    try {
        const releaseData = await db.all('SELECT * FROM releases;')

        const songsTotal = releaseData.reduce((acc, curr) => {
            return acc + JSON.parse(curr.videos).length
        }, 0)

        const releasesTotal = releaseData.length

        const stylesTotal = reduceToUnique(releaseData.flatMap(release => release.styles.split(','))).length - 1

        const genresTotal = reduceToUnique(releaseData.flatMap(release => release.genres.split(/[,/]/g))).length

        const years = reduceToUnique(releaseData.map(release => release.year))
        const yearsTotal = Math.max(...years) - Math.min(...years)

        await db.run(`UPDATE stats SET
                    songs = ${songsTotal},
                    releases = ${releasesTotal},
                    styles = ${stylesTotal},
                    genres = ${genresTotal},
                    years = ${yearsTotal}
                    WHERE id = 1;`)

        console.log(
            boxen('Stats table successfully updated!', {
                borderColor: 'green',
                borderStyle: 'round',
                dimBorder: true,
                padding: 1,
                margin: 1
            })
        )
    } catch (error) {
        console.log(
            boxen('Stats table failed to update. Please see error logs below.', {
                borderColor: 'red',
                borderStyle: 'round',
                dimBorder: true,
                padding: 1,
                margin: 1
            })
        )
        console.log(
            boxen(`${error}`, {
                borderColor: 'red',
                borderStyle: 'round',
                dimBorder: true,
                padding: 1,
                margin: 1
            })
        )
    }
}

module.exports = updateStats
