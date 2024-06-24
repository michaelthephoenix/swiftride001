// // src/utils/mapUtils.js
// const googleMapsClient = require('../config/mapConfig');

// const getDirections = async (origin, destination) => {
//     try {
//         const response = await googleMapsClient.directions({
//             origin: origin,
//             destination: destination,
//             mode: 'driving'
//         }).asPromise();

//         return response.json.routes[0];
//     } catch (error) {
//         console.error('Error getting directions:', error);
//         throw error;
//     }
// };

// const calculateDistance = async (origin, destination) => {
//     try {
//         const response = await googleMapsClient.distanceMatrix({
//             origins: [origin],
//             destinations: [destination],
//             mode: 'driving',
//         }).asPromise();

//         return response.json.rows[0].elements[0].distance.value; // distance in meters
//     } catch (error) {
//         console.error('Error calculating distance:', error);
//         throw error;
//     }
// };

// module.exports = {
//     getDirections,
//     calculateDistance
// };

require('dotenv').config();
const fetch = require('node-fetch');

const getDirections = async (origin, destination) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`API call failed: ${data.error_message}`);
        }
        return data.routes[0];
    } catch (error) {
        console.error('Error getting directions:', error);
        throw error;
    }
};

const calculateDistance = async (origin, destination) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&mode=driving&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`API call failed: ${data.error_message}`);
        }
        return data.rows[0].elements[0].distance.value; // distance in meters
    } catch (error) {
        console.error('Error calculating distance:', error);
        throw error;
    }
};

module.exports = {
    getDirections,
    calculateDistance
};
