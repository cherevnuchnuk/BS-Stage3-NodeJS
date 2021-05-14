const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    next()
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    res.data = "test"
    res.status(200)
    next()
}, responseMiddleware);

router.post('/', (req, res, next) => {

}, responseMiddleware);

router.put('/:id', (req, res, next) => {

}, responseMiddleware);

router.delete('/:id', (req, res, next) => {

}, responseMiddleware);

module.exports = router;
