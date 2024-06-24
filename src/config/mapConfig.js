// const gooogleMapsClient = require('@google/maps').createClient({
//     key: process.env.GOOGLE_MAPS_API_KEY,
//     Promise: Promise
// });

// module.exports = gooogleMapsClient;

require('dotenv').config();
const { Client } = require('@googlemaps/google-maps-services-js');

const googleMapsClient = new Client({});

module.exports = {
    directions: (params) => googleMapsClient.directions({
        params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            ...params
        }
    }),
    distanceMatrix: (params) => googleMapsClient.distanceMatrix({
        params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            ...params
        }
    })
};

