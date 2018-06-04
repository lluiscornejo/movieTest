import axios from 'axios';

import CONSTANTS from '../../application/store/constants';

export function getList() {
    return axios.get(`${CONSTANTS.api}/${CONSTANTS.discover_movie}?api_key=${CONSTANTS.api_key}&${CONSTANTS.sort_popularity}`);
}

export function getMovie(id) {
    return axios.get(`${CONSTANTS.api}/${CONSTANTS.movie}/${id}?api_key=${CONSTANTS.api_key}`);
}

export function getSearch(term) {
    return axios.get(`${CONSTANTS.api}/${CONSTANTS.search_movie}?api_key=${CONSTANTS.api_key}&query=${term}`);
}

/**
 * Interceptor
 */

// Request
axios.interceptors.request.use((config) => {
    // Do something before request is sent
    return config;
});

// Response
axios.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, (error) => {

    if(error.toString().indexOf('404') !== -1){
        window.location = '/404';
    }

    if(error.toString().indexOf('Network Error') !== -1){
        // I can use redux to show a modal
        console.warn('Network Error');
    }
    return Promise.reject(error);
});

