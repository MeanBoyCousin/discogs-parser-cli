const fetch = require('node-fetch');

const check = async id => {
    const res = await fetch(`https://img.youtube.com/vi/${id}/0.jpg`);
    return res.status;
};

const checkVideoStatus = async release => {
    release.videos = await release.videos.reduce(async (accPromise, curr) => {
        return await Promise.all([accPromise, check(curr.src.slice(32))]).then(values => {
            const acc = values[0];
            const checkResult = values[1];
            if (checkResult === 200) {
                acc.push(curr);
                return acc;
            } else {
                return acc;
            }
        });
    }, []);

    return release;
};

module.exports = checkVideoStatus;
