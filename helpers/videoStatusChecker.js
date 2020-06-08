const fetch = require('node-fetch')

const check = async id => {
    const res = await fetch(`https://img.youtube.com/vi/${id}/0.jpg`)
    return res.status
}

const checkVideoStatus = async release => {
    release.videos = await Promise.all(
        release.videos.map(async video => {
            const status = await check(video.src.slice(32))
            if (status === 200) {
                return video
            } else {
                return {}
            }
        })
    ).then(videos => {
        return videos.filter(video => video.src !== undefined)
    })

    return release
}

module.exports = checkVideoStatus
