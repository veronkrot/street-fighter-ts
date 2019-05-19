import {utils} from "./helpers/utils";

class Fighter {

    constructor(details) {
        this._id = details._id;
        this.name = details.name;
        this.health = details.health;
        this.attack = details.attack;
        this.defense = details.defense;
        this.source = details.source;
    }

    getHitPower() {
        const criticalHitChance = utils.getRandomNumberInRange(1, 2);
        const hitPower = this.attack * criticalHitChance;
        console.debug(this.name + ' hit power: ' + hitPower);
        return hitPower;
    }

    getBlockPower() {
        const dodgeChance = utils.getRandomNumberInRange(1, 2);

        const blockPower = this.defense * dodgeChance;
        console.debug(this.name + ' block power: ' + blockPower);
        return blockPower;
    }

}

export default Fighter;
