const request = require('request');

_EXTERNAL_URL = 'https://api.themoviedb.org/3/movie/550?api_key=2dac38d1800b19e13d7dce1cc51db7c8';

const callExternalApiUsingRequest = (callback) => {
    request(_EXTERNAL_URL, { json: true }, (err, res, body) => {
    if (err) { 
        return callback(err);
    }
    return callback(body);
    });
}

module.exports.callApi = callExternalApiUsingRequest;