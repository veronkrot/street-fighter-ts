import {utils} from "./utils";

class Fighter {

    constructor(details) {
        this._id = details._id;
        this.name = details.name;
        this.health = details.health;
        this.attack = details.attack;
        this.defense = details.defense;
    }

    getHitPower() {
        const criticalHitChance = utils.getRandomNumberInRange(1, 2);
        return this.attack * criticalHitChance;
    }

    getBlockPower() {
        const dodgeChance = utils.getRandomNumberInRange(1, 2);
        return this.defense * dodgeChance;
    }

}

export default Fighter;
