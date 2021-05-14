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
    const {firstName, lastName, email, phoneNumber, password} = req.body
    if (Validator.isEmptyVal(firstName)) {
        errors["firstName"] = "First name should not be  empty"
    }
    if (Validator.isEmptyVal(lastName)) {
        errors["lastName"] = "Last Name should not be empty"
    }

    if (Validator.isEmptyVal(email)) {
        errors["email"] = "Email should not be empty"
    }
    else if (!Validator.isGmail(email)){
        errors["email"] = "Email should be in correct format"
    }

    if (Validator.isEmptyVal(phoneNumber)) {
        errors["phoneNumber"] = "Phone number should not be empty"
    }
    else if (!Validator.isPhoneNumber(phoneNumber)){
        errors["phoneNumber"] = "Phone number should be in correct format +380..."
    }

    if (Validator.isEmptyVal(password)) {
        errors["password"] = "Password should not be empty"
    }
    else if (!Validator.isInBounds(password.length, 3, 200)){
        errors["password"] = "Password should have at least 3 symbols"
    }

    if (Object.keys(errors).length > 0) {
        res.err = errors
    }
    else {
        req.user = {firstName, lastName, email, phoneNumber, password}
    }
    next();
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
