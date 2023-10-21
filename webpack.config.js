const path = require("path")

const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    target: "node",
    //入口
    entry: "./index.js",
    //输出
    output: {
        //输出路径，必须是绝对路径
        path: path.join(__dirname, "./dist"),
        //输出文件名
        filename: "main.js"
    },
    //模式  development 和 production
    mode: "production",
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static', to: 'static' },
            ]
        })
    ]
}