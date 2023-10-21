const express = require("express")
const cors = require("cors")
const os = require("os")
const nonSecurePort = require("./service/Non_secure_port")
const { getIpAddress } = require("./service/common")

class Server {
    static app = express()
    static express = express
    constructor(port) {
        Server.app.use(cors())
        this.openServer(port)
    }
    openServer(port) {
        const address = getIpAddress();
        (function open(port) {
            if (nonSecurePort.includes(port)) {
                console.log(`端口号${port}为浏览器非安全端口号，端口号已自动加 1`)
                return open(port += 1)
            }
            const server = Server.app.listen(port)
            server.on("listening", () => { console.log(`http://${address}${port === 80 ? "" : ":" + port}`) })
            server.on("error", (error) => error.code == "EADDRINUSE" ? console.log(`端口号${port}被占用，已自动加 1`) & open(port += 1) : console.log(error))
        })(port)
    }
}
module.exports = {
    Server,
    app: Server.app
}