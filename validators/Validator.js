class Validator {

    isNumber(val) {
        let number_val = Number(val)
        return !isNaN(number_val) && Number.isFinite(number_val)
    }

    isEmptyVal(val) {
        return val === '' || !val || val.length === 0
    }

    isGmail(val) {
        return /^[\w.\-]*@gmail\.com$/.test(val)
    }

    isPhoneNumber(val) {
        return /^\+380(\d{9})$/.test(val);
    }

    isInBounds(val, left, right) {
        let number_val = Number(val)
        if (!isNaN(number_val)) {
            return left <= number_val && number_val <= right
        }
        return false
    }

    onlyMandatoryAttributes(object, amount) {
        return Object.keys(object).length > amount
    }
}

module.exports = new Validator();
