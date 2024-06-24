// src/controllers/RideController.js
const Ride = require('../models/Ride');
const User = require('../models/User');
const mapUtils = require('../utils/mapUtils');

exports.requestRide = async (req, res) => {
    const { userId, origin, destination } = req.body;
    
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const route = await mapUtils.getDirections(origin, destination);
        const distance = await mapUtils.calculateDistance(origin, destination);
        const fare = calculateFare(distance);

        const ride = new Ride({
            user: userId,
            origin,
            destination,
            fare,
            route
        });

        await ride.save();
        res.status(201).json({ ride });
    } catch (error) {
        res.status(500).json({ message: "Failed to request ride", error: error.message });
    }
};

const calculateFare = (distance) => {
    // Basic fare calculation logic
    return (distance / 1000) * 2; // e.g., $2 per km
};
