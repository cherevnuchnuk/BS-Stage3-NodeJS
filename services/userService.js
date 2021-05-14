const { UserRepository } = require('../repositories/userRepository');

class UserService {

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    getAll(){
        return UserRepository.getAll()
    }
    create({firstName, lastName, email, phoneNumber, password}){
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
}

module.exports = new UserService();
