const {user} = require('../models/user');
const Validator = require('../validators/Validator')
// email - только gmail почты
// phoneNumber: +380xxxxxxxxx
// power - число, 1 < power < 100
// defense - число, 1 < defense < 10
// health - число, 80 < health < 120, необязательное поле(по умолчанию - 100)
// password - строка, min 3 символа
// User
//     id: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     password: '' // min 3 symbols
const createUserValid = (req, res, next) => {
    let errors = {}
    const {firstName, lastName, email, phoneNumber, password, ...rest} = req.body
    if (req.body.id) {
        errors["id"] = "Id should not be passed into creation"
    }
    if (!Validator.onlyMandatoryAttributes(rest, 0)) {
        errors["attributes"] = "Passed too much attributes"
    }
    if (Validator.isEmptyVal(firstName)) {
        errors["firstName"] = "First name should not be empty"
    }
    if (Validator.isEmptyVal(lastName)) {
        errors["lastName"] = "Last Name should not be empty"
    }

    if (Validator.isEmptyVal(email)) {
        errors["email"] = "Email should not be empty"
    } else if (!Validator.isGmail(email)) {
        errors["email"] = "Email should be in correct format"
    }

    if (Validator.isEmptyVal(phoneNumber)) {
        errors["phoneNumber"] = "Phone number should not be empty"
    } else if (!Validator.isPhoneNumber(phoneNumber)) {
        errors["phoneNumber"] = "Phone number should be in correct format +380..."
    }

    if (Validator.isEmptyVal(password)) {
        errors["password"] = "Password should not be empty"
    } else if (!Validator.isInBounds(password.length, 3, 200)) {
        errors["password"] = "Password should have at least 3 symbols"
    }

    if (Object.keys(errors).length > 0) {
        res.err = errors
    } else {
        req.user = {
            firstName, lastName, email, phoneNumber, password
        }
        for (const key in req.user) {
            if (req.user[key]) {
                req.user[key] = req.user[key].toLowerCase();
            }
        }
    }

    next();
}

const updateUserValid = (req, res, next) => {
    let errors = {}
    const {firstName, lastName, email, phoneNumber, password, ...rest} = req.body
    if (req.body.id) {
        errors["id"] = "Id should not be passed into update"
    }
    if (!Validator.onlyMandatoryAttributes(rest, 0)) {
        errors["attributes"] = "Passed too much attributes"
    }

    if (!Validator.onlyMandatoryAttributes(req.body, 0)) {
        errors["attributes"] = "Passed no attributes"
    }

    if (email && !Validator.isGmail(email)) {
        errors["email"] = "Email should be in correct format"
    }

    if (phoneNumber && !Validator.isPhoneNumber(phoneNumber)) {
        errors["phoneNumber"] = "Phone number should be in correct format +380..."
    }

    if (password && !Validator.isInBounds(password.length, 3, 200)) {
        errors["password"] = "Password should have at least 3 symbols"
    }

    if (Object.keys(errors).length > 0) {
        res.err = errors
    } else {
        req.user = {
            firstName, lastName, email, phoneNumber, password
        }
        for (const key in req.user) {
            if (req.user[key]) {
                req.user[key] = req.user[key].toLowerCase();
            }

        }
    }
    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
