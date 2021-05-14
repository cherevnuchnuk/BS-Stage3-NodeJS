const responseMiddleware = (req, res) => {
    console.log("body:", req.body, "; params:", req.params)
    console.log("body:", res.data, "; err:", res.err)
    if (res.err) {
        res.json({
            error: true,
            message: res.err.message ? res.err.message : res.err
        })
    } else {
        res.json({
            data: res.data
        })
    }

    res.send()
}

exports.responseMiddleware = responseMiddleware;
