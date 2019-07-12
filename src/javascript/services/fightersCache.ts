import Fighter from "../fighter";

class FightersCache {
    fighterDetailsCache: Map<string | number, Fighter> = new Map();

    constructor() {
        this.updateCache = this.updateCache.bind(this);
    }


    updateCache(fighterDetails: Fighter, _id: string | number): void {
        let id: string | number = _id ? _id : fighterDetails._id;
        this.fighterDetailsCache.set(id, fighterDetails);
    }

    get(_id: string | number): Fighter {
        return this.fighterDetailsCache.get(_id) as Fighter;
    }

    has(_id: string | number): boolean {
        return this.fighterDetailsCache.has(_id);
    }

}

export const fightersCache: FightersCache = new FightersCache();
