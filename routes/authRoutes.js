const {Router} = require('express');
const AuthService = require('../services/authService');
const {responseMiddleware} = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        const {email, password} = req.body
        res.data = AuthService.login({email, password});
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;
