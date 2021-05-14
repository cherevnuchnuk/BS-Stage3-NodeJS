class Validator {

    isNumber(val) {
        return Number.isFinite(val)
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
}

module.exports = new Validator();
