const {Router} = require('express');
const FighterService = require('../services/fighterService');
const {responseMiddleware} = require('../middlewares/response.middleware');
const {createFighterValid, updateFighterValid} = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    try {
        res.data = FighterService.getAll()
        res.status(200)
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id
        res.data = FighterService.findOne(id)
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

router.post('/', createFighterValid, (req, res, next) => {
    try {
        // middleware should return fighter if no errors exist
        const fighter = req.fighter
        if (fighter) {
            res.data = FighterService.create(fighter)
            res.status(201)
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

router.put('/:id', updateFighterValid, (req, res, next) => {
    try {
        // middleware should return user if no errors exist
        const user = req.fighter
        if (user) {
            const id = req.params.id
            res.data = FighterService.update(id, user)
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
        const fighter = FighterService.delete(id)
        res.status(204)
    } catch (err) {
        res.status(404)
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);


module.exports = router;
