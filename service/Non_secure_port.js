const fs = require("fs")
const path = require("path")
const nonSecurePortStr = fs.readFileSync(path.join(__dirname,"../static/Non_secure_port.txt"), { encoding: "utf-8" })

const nonSecurePort = nonSecurePortStr.match(/^\d+/mg).map(port => parseInt(port))

module.exports = nonSecurePort
