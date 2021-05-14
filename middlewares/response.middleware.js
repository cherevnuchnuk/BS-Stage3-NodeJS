const responseMiddleware = (req, res) => {
    console.log("body:", req.body, "; params:", req.params)
    console.log("body:", res.body, "; err:", res.err)
    if (res.err) {
        res.json({
            error: true,
            message: res.err.message
        })
    }
    else {
        res.status(200)
    }
    res.send()
}

exports.responseMiddleware = responseMiddleware;
