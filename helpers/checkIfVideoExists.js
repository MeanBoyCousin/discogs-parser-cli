const fetch = require('node-fetch');

const checkIfVIdeoExists = async video => {
    let res = await fetch(`https://img.youtube.com/vi/${video}/0.jpg`);
    return res.statusText;
};

module.exports = checkIfVIdeoExists;
