import {callApi, IApiResponse} from '../helpers/apiHelper';
import Fighter from "../fighter";

class FighterService {

    public async getFighters(): Promise<Array<Fighter>> {
        try {
            const endpoint: string = 'fighters.json';
            const apiResult: IApiResponse = await callApi(endpoint, 'GET');
            return JSON.parse(atob(apiResult.content));
        } catch (error) {
            throw error;
        }
    }

    public async getFighterDetails(_id: string | number): Promise<Fighter> {
        try {
            const endpoint: string = `details/fighter/${_id}.json`;
            const apiResult: IApiResponse = await callApi(endpoint, 'GET');
            return JSON.parse(atob(apiResult.content));
        } catch (error) {
            throw error;
        }
    }
}

export const fighterService: FighterService = new FighterService();
