// const { getDirections, calculateDistance } = require('../src/utils/mapUtils');

// describe('Google Maps API Tests', () => {
//     test('fetches directions successfully', async () => {
//         const origin = 'Times Square, Manhattan, NY 10036';
//         const destination = 'Central Park, New York, NY 10024';
//         const directions = await getDirections(origin, destination);
//         expect(directions).toBeDefined();
//         expect(directions.routes.length).toBeGreaterThan(0);
//     });

//     test('calculates distance successfully', async () => {
//         const origin = 'Times Square, Manhattan, NY 10036';
//         const destination = 'Central Park, New York, NY 10024';
//         const distance = await calculateDistance(origin, destination);
//         expect(distance).toBeGreaterThan(0);
//     });
// });


// mapUtils.test.js
const { getDirections, calculateDistance } = require('../src/utils/mapUtils');
require('dotenv').config();

describe('Google Maps API Tests', () => {
    const origin = 'Times Square, Manhattan, NY 10036';
    const destination = 'Central Park, New York, NY 10024';

    test('fetches directions successfully', async () => {
        const data = await getDirections(origin, destination);
        expect(data).toBeDefined();
        expect(data.bounds).toBeDefined();
        expect(data.legs).toBeDefined();
    });

    test('calculates distance successfully', async () => {
        const distance = await calculateDistance(origin, destination);
        expect(distance).toBeGreaterThan(0);  // Assuming the distance must be greater than zero
    });

    test('fails to fetch directions with invalid API key', async () => {
        process.env.GOOGLE_MAPS_API_KEY = 'invalid_key'; // Temporarily set an invalid API key
        await expect(getDirections(origin, destination)).rejects.toThrow('API call failed');
        process.env.GOOGLE_MAPS_API_KEY = 'your_actual_google_maps_api_key'; // Reset to valid API key
    });

    test('fails to calculate distance with invalid API key', async () => {
        process.env.GOOGLE_MAPS_API_KEY = 'invalid_key'; // Temporarily set an invalid API key
        await expect(calculateDistance(origin, destination)).rejects.toThrow('API call failed');
        process.env.GOOGLE_MAPS_API_KEY = 'your_actual_google_maps_api_key'; // Reset to valid API key
    });
});

