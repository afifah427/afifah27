
const https = require('https');

_EXTERNAL_URL = 'https://api.themoviedb.org/3/movie/550?api_key=2dac38d1800b19e13d7dce1cc51db7c8';


const callExternalApiUsingHttp = (callback) => {
    https.get(_EXTERNAL_URL, (resp) => {
    let data = '';
    
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });
    
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        return callback(data);
       // console.log(JSON.stringify(data));
    });
    
    }).on("error", (err) => {
    
    console.log("Error: " + err.message);
    });
}

module.exports.callApi = callExternalApiUsingHttp;