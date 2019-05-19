class FightersCache {
    fighterDetailsCache = new Map();

    constructor() {
        this.updateCache = this.updateCache.bind(this);
    }


    updateCache(fighterDetails, _id) {
        let id = _id ? _id : fighterDetails._id;
        this.fighterDetailsCache.set(id, fighterDetails);
    }

    get(_id) {
        return this.fighterDetailsCache.get(_id);
    }

    has(_id) {
        return this.fighterDetailsCache.has(_id);
    }

}

export const fightersCache = new FightersCache();
