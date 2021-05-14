const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    search(search) {
        const item = FighterRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }
    findOne(id){
        const fighter = this.search({id})
        if (!fighter) {
            throw Error("Fighter not found")
        }
        return fighter
    }

    getAll() {
        return FighterRepository.getAll()
    }

    create({name, health, power, defense}) {
        const fighterName = this.search({name})
        if (fighterName) {
            throw Error("Fighter with this name already exists")
        }
        return FighterRepository.create({name, health, power, defense})
    }

    update(id, {name, health, power, defense}) {
        const fighter = FighterRepository.update(id, {name, health, power, defense})
        if (!fighter) {
            throw Error("Fighter not found")
        }
        return fighter
    }

    delete(id) {
        const fighter = FighterRepository.delete(id)
        if (!fighter) {
            throw Error("Fighter not found")
        }
        return fighter
    }
}

module.exports = new FighterService();
