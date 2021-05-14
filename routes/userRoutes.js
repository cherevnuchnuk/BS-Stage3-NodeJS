const {Router} = require('express');
const UserService = require('../services/userService');
const {createUserValid, updateUserValid} = require('../middlewares/user.validation.middleware');
const {responseMiddleware} = require('../middlewares/response.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    try {
        res.data = UserService.getAll()
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const userId = req.params.id
        res.data = UserService.search({id: userId})
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
    try {
        // middleware should return user if no errors exist
        const user = req.user
        if (user){
            res.data = UserService.create(user)
        }
        // else there is problem with arguments
        else{
            res.status(400)
        }
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.put('/:id', (req, res, next) => {

}, responseMiddleware);

router.delete('/:id', (req, res, next) => {

}, responseMiddleware);

module.exports = router;
