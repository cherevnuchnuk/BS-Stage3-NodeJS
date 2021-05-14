const {fighter} = require('../models/fighter');
const Validator = require('../validators/Validator')
//    "id": "",
//     "name": "",
//     "health": 100,
//     "power": 0,
//     "defense": 1, // 1 to 10
// power - число, 1 < power < 100
// defense - число, 1 < defense < 10
// health - число, 80 < health < 120, необязательное поле(по умолчанию - 100)

const createFighterValid = (req, res, next) => {
    let errors = {}
    let {name, health, power, defense, ...rest} = req.body

    if (req.body.id) {
        errors["id"] = "Id should not be passed into creation"
    }
    if (Validator.onlyMandatoryAttributes(rest, 0)) {
        errors["attributes"] = "Passed too much attributes"
    }

    if (Validator.isEmptyVal(name)) {
        errors["name"] = "Name should not be empty"
    }

    if (health) {
        if (!Validator.isNumber(health)) {
            errors["health"] = "health should be a number"
        } else if (!Validator.isInBounds(health, 80, 120)) {
            errors["health"] = "health should be between 80 and 120"
        }
    } else {
        health = "100"
    }

    if (Validator.isEmptyVal(power)) {
        errors["power"] = "Power should not be empty"
    } else if (!Validator.isNumber(power)) {
        errors["power"] = "Power should be a number"
    } else if (!Validator.isInBounds(power, 1, 100)) {
        errors["power"] = "Power should be between 1 and 100"
    }

    if (Validator.isEmptyVal(defense)) {
        errors["defense"] = "Defense should not be empty"
    } else if (!Validator.isNumber(defense)) {
        errors["defense"] = "Defense should be a number"
    } else if (!Validator.isInBounds(defense, 1, 10)) {
        errors["defense"] = "Defense should be between 1 and 10"
    }

    if (Object.keys(errors).length > 0) {
        res.err = errors
    } else {
        req.fighter = {name, health, power, defense}
        for (const key in req.fighter) {
            if (req.fighter[key]){
                req.fighter[key] = req.fighter[key].toLowerCase();
            }
        }
    }
    next();
}

const updateFighterValid = (req, res, next) => {
    let errors = {}
    let {name, health, power, defense, ...rest} = req.body

    if (Validator.onlyMandatoryAttributes(rest, 0)) {
        errors["attributes"] = "Passed too much attributes"
    }

    if (!Validator.onlyMandatoryAttributes(req.body, 0)) {
        errors["attributes"] = "Passed no attributes"
    }

    if (health) {
        if (!Validator.isNumber(health)) {
            errors["health"] = "health should be a number"
        } else if (!Validator.isInBounds(health, 80, 120)) {
            errors["health"] = "health should be between 80 and 120"
        }
    }

    if (power) {
        if (!Validator.isNumber(power)) {
            errors["power"] = "Power should be a number"
        } else if (!Validator.isInBounds(power, 1, 100)) {
            errors["power"] = "Power should be between 1 and 100"
        }
    }

    if (defense) {
        if (!Validator.isNumber(defense)) {
            errors["defense"] = "Defense should be a number"
        } else if (!Validator.isInBounds(defense, 1, 10)) {
            errors["defense"] = "Defense should be between 1 and 10"
        }
    }

    if (Object.keys(errors).length > 0) {
        res.err = errors
    } else {
        req.fighter = {name, health, power, defense}
        for (const key in req.fighter) {
            if (req.fighter[key]){
                req.fighter[key] = req.fighter[key].toLowerCase();
            }
        }
    }
    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
