const fs = require('fs')
const path = require('path')
const flow = require('xml-flow')
const xmlInputFile = fs.createReadStream(path.join(__dirname, process.argv[2]))
const xmlStream = flow(xmlInputFile)

let lines = 0;

xmlStream.on('tag:master', (master) => {

    lines += 1;

    console.log(lines)

})
