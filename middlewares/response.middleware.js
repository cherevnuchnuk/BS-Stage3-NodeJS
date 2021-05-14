const responseMiddleware = (req, res, next) => {
    console.log("Response middleware")
    console.log("body:", req.body, "; params:", req.params)
    if (res.err) {
        res.error = true
        res.message = res.err
    }
    else {
        res.status(200)
    }
    res.send()
    next();
}

exports.responseMiddleware = responseMiddleware;
