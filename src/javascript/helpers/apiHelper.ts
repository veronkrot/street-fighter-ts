import {i18n} from "./i18n";

const API_URL: string = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';

export interface IApiResponse {
    name: string,
    path: string,
    sha: string,
    size: number,
    url: string,
    html_url: string,
    git_url: string,
    download_url: string,
    type: string,
    content: string,
    encoding: string,
    _links: {
        self: string,
        git: string,
        html: string
    }
}


function callApi(endpoint: string, method: string): Promise<IApiResponse> {
    const url: string = API_URL + endpoint;
    const options = {
        method
    };

    return fetch(url, options)
        .then(response =>
            response.ok ? response.json() : Promise.reject(Error(i18n.get('failedToLoad')))
        )
        .catch(error => {
            throw error;
        });
}

export {callApi}
