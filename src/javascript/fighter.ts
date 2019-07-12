import {utils} from "./helpers/utils";

export interface IFighterParams {
    [key:string]: number;
    health: number;
    attack: number;
    defense: number;
    currentHealth: number;
}

export class FighterUtils {
    static getHitPower(fighter: Fighter): number {
        const criticalHitChance: number = utils.getRandomNumberInRange(1, 2);
        const hitPower: number = fighter.attack * criticalHitChance;
        console.debug(fighter.name + ' hit power: ' + hitPower);
        return hitPower;
    }

    static getBlockPower(fighter: Fighter): number {
        const dodgeChance: number = utils.getRandomNumberInRange(1, 2);

        const blockPower: number = fighter.defense * dodgeChance;
        console.debug(fighter.name + ' block power: ' + blockPower);
        return blockPower;
    }
}


class Fighter {
    [key:string]: number | string | IFighterParams;
    _id: string | number;
    name: string;
    health: number;
    attack: number;
    defense: number;
    source: string;
    currentHealth: number;
    _changes: IFighterParams;

    constructor({_id, name, health, attack, defense, source}:
                    {
                        _id: string | number,
                        name: string,
                        health: number,
                        attack: number,
                        defense: number,
                        source: string
                    }) {
        this._id = _id;
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.source = source;
        this.currentHealth = health;
        this._changes = {} as IFighterParams;
    }

}

export default Fighter;
