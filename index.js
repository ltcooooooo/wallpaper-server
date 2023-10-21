const { Server, app } = require("./server.js")
const axios = require("axios")
const { JSDOM } = require("jsdom")

app.get("/list", (req, res) => {
    const page = req.query.page
    axios.get(`https://wallhaven.cc/toplist?page=${page ? page : "1"}`).then(r => {
        const html = r.data
        const dom = new JSDOM(html)
        let page = /<h2.+?(\d+).+?(\d+)<\/h2>/gi.exec(html)
        const document = dom.window.document
        const lis = document.querySelectorAll("section ul li")
        const imgs = []
        for (const item of lis) {
            const smallSrc = item.querySelector("img").getAttribute("data-src")
            let format = 'jpg'
            const imgName = /https:\/\/th\.wallhaven.cc\/small\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)\.(jpg|png)/.exec(smallSrc)
            const size = item.querySelector(".wall-res").innerHTML
            const isPng = item.querySelector(".png")
            format = isPng ? "png" : "jpg"
            const imgSrc = `https://w.wallhaven.cc/full/${imgName[1]}/wallhaven-${imgName[2]}.${format}`
            imgs.push({
                smallSrc,
                imgSrc,
                size
            })
        }
        res.send(page ? { currentPage: page[1], totalPage: page[2], data: imgs } : { data: imgs })
    })
})


app.get("/wallpaper", (req, res) => {
    const url = decodeURIComponent(req.query.url)
    axios.get(url, {
        responseType: 'arraybuffer',
        headers: {
            'Accept': 'image/*'
        }
    }).then(imgres => {
        setTimeout(() => {
            res.send(imgres.data)
        }, 2000)
    }).catch((err) => {
        res.send({
            code: -1,
            message: err
        })
    })
})


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: { message: err.message, },
    });
    next()
});

new Server(80)
