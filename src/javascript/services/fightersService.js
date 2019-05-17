import {callApi} from '../helpers/apiHelper';

class FighterService {
    fighterDetailsCache = new Map();

    async getFighters() {
        try {
            const endpoint = 'fighters.json';
            const apiResult = await callApi(endpoint, 'GET');

            return JSON.parse(atob(apiResult.content));
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(_id) {
        try {
            if (this.fighterDetailsCache.has(_id)) {
                return this.fighterDetailsCache.get(_id);
            }
            const endpoint = `details/fighter/${_id}.json`;
            const apiResult = await callApi(endpoint, 'GET');
            const fighterDetails = JSON.parse(atob(apiResult.content));
            this.fighterDetailsCache.set(_id, fighterDetails);
            return fighterDetails;
        } catch (error) {
            throw error;
        } finally {
            console.log(this.fighterDetailsCache);
        }
    }
}

export const fighterService = new FighterService();
