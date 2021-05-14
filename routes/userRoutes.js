const {Router} = require('express');
const UserService = require('../services/userService');
const {createUserValid, updateUserValid} = require('../middlewares/user.validation.middleware');
const {responseMiddleware} = require('../middlewares/response.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    try {
        res.data = UserService.getAll()
        res.status(200)
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const userId = req.params.id
        res.data = UserService.findOne({id: userId})
        if (res.data) {
            res.status(200)
        }
    } catch (err) {
        res.status(404)
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
    try {
        // middleware should return user if no errors exist
        const user = req.user
        if (user) {
            for (const key in user) {
                user[key] = user[key].toLowerCase();
            }
            res.data = UserService.create(user)
            res.status(200)
        }
        // else there is problem with arguments
        else {
            res.status(400)
        }
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
    try {
        // middleware should return user if no errors exist
        const user = req.user
        if (user) {
            for (const key in user) {
                user[key] = user[key].toLowerCase();
            }
            const id = req.params.id
            res.data = UserService.update(id, user)
            res.status(200)
        }
        // else there is problem with arguments
        else {
            res.status(400)
        }
    } catch (err) {
        res.status(404)
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const id = req.params.id
        const user = UserService.delete(id)
        res.status(204)
    } catch (err) {
        res.status(404)
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

module.exports = router;
