const {UserRepository} = require('../repositories/userRepository');

class UserService {

    search(search) {
        const item = UserRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }
    findOne(id){
        const user = this.search({id})
        if (!user) {
            throw Error("User not found")
        }
        return user
    }

    getAll() {
        return UserRepository.getAll()
    }

    create({firstName, lastName, email, phoneNumber, password}) {
        const emailUser = this.search({email})
        if (emailUser) {
            throw Error("User with this email already exists")
        }
        const phoneUser = this.search({phoneNumber})
        if (phoneUser) {
            throw Error("User with this phone number already exists")
        }
        return UserRepository.create({firstName, lastName, email, phoneNumber, password})
    }

    update(id, {firstName, lastName, email, phoneNumber, password}) {
        const user = UserRepository.update(id, {firstName, lastName, email, phoneNumber, password})
        if (!user) {
            throw Error("User not found")
        }
        return user
    }

    delete(id) {
        const user = UserRepository.delete(id)
        if (!user) {
            throw Error("User not found")
        }
        return user
    }
}

module.exports = new UserService();
