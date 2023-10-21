const os = require("os")
const getIpAddress = () => {
    const network = os.networkInterfaces()
    const platform = os.platform()
    switch (platform) {
        case "darwin":
            //获取到en开头的
            const networkArr = []
            const en = Object.entries(network).filter(([key, value]) => /en\d+/.test(key))
            en.forEach(([key, value]) => networkArr.push(...value))
            //获取IPv4地址
            const IPv4 = networkArr.filter(en => en.family === "IPv4")
            return IPv4[0].address
            break;
        default:
            console.log(platform)
            return "127.0.0.1"
            break;
    }
}

module.exports = {
    getIpAddress
}