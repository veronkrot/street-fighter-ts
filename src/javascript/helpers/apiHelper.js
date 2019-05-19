import {i18n} from "./i18n";

const API_URL = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';

function callApi(endpoint, method) {
  const url = API_URL + endpoint;
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

export { callApi }
