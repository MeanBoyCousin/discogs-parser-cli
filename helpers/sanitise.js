const omit = require('lodash.omit')

const removeNulls = videosArray => {
    return videosArray.filter(video => video !== null)
}

const sanitise = master => {
    master.id = master['$attrs'].id

    master = omit(master, ['$name', 'main_release', 'data_quality', 'images', '$attrs', 'notes'])

    if (Array.isArray(master.artists) && typeof master.artists[0] === 'object') master.artists = master.artists[0].name

    if (Array.isArray(master.artists) && typeof master.artists[0] === 'string')
        master.artists = master.artists.join(', ')

    if (typeof master.artists === 'object') master.artists = master.artists.name

    if (Array.isArray(master.videos)) {
        master.videos = master.videos.map(video => {
            if (video['$attrs'] !== undefined) {
                return {
                    src: video['$attrs'].src,
                }
            }
        })
    } else {
        if (master.videos['$attrs'] !== undefined) master.videos.src = master.videos['$attrs'].src
        master.videos = omit(master.videos, ['title', 'description', '$attrs'])
        master.videos = [master.videos]
    }

    removeNulls(master.videos)

    // String formatting replacements.
    master.artists = master.artists.replace(/(\s\(\d+\))$/, '').replace(/'/g, "''")
    if (master.artists.includes(', The')) master.artists = `The ${master.artists.replace(', The', '')}`
    if (master.genres.includes("Children's") && Array.isArray(master.genres)) {
        master.genres = master.genres.map(genre => genre.replace(/'/g, "''"))
    }
    if (master.genres.includes("Children's") && typeof master.genres === 'string') {
        master.genres = master.genres.replace(/'/g, "''")
    }
    if (master.styles !== undefined) {
        if (master.styles.includes("Min'yō") && Array.isArray(master.styles)) {
            master.styles = master.styles.map(style => style.replace(/'/g, "''"))
        }
        if (master.styles.includes("Min'yō") && typeof master.styles === 'string') {
            master.styles = master.styles.replace(/'/g, "''")
        }
    }
    master.title = master.title.replace(/'/g, "''")

    return master
}

module.exports = sanitise
