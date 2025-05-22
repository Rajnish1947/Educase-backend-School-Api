
const { addSchool, getSchools } = require('../models/schoolModel');

// Haversine formula to calculate distance between two coordinates
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = angle => (angle * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// API to add a new school
const createSchool = async (req, res) => {
    try {
    

        let { name, address, latitude, longitude } = req.body;

        let errors = [];

        // Validate required fields
        if (!name) errors.push("Name is required.");
        if (!address) errors.push("Address is required.");
        if (latitude === undefined) errors.push("Latitude is required.");
        if (longitude === undefined) errors.push("Longitude is required.");

        // Validate data types
        if (typeof name !== "string") errors.push("Name must be a string.");
        if (typeof address !== "string") errors.push("Address must be a string.");

        // Convert to number
        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);

        // Validate latitude & longitude are numbers
        if (isNaN(latitude)) errors.push("Latitude must be a valid floating-point number.");
        if (isNaN(longitude)) errors.push("Longitude must be a valid floating-point number.");

        // Validate range of latitude & longitude
        if (latitude < -90 || latitude > 90) errors.push("Latitude must be between -90 and 90.");
        if (longitude < -180 || longitude > 180) errors.push("Longitude must be between -180 and 180.");

        // If there are any errors, return them
        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation failed.", errors });
        }

        // Insert into database
        const result = await addSchool(name.trim(), address.trim(), latitude, longitude);
      

        res.status(201).json({ message: "School added successfully." });
    } catch (error) {
       
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};


const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validate if latitude and longitude are provided
        if (!latitude || !longitude) {
            return res.status(400).json({ message: "Latitude and longitude are required." });
        }

        // Convert to float
        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);

        let errors = [];

        // Check if valid float
        if (isNaN(userLatitude)) errors.push("Latitude must be a valid floating-point number.");
        if (isNaN(userLongitude)) errors.push("Longitude must be a valid floating-point number.");

        // Check latitude and longitude range
        if (userLatitude < -90 || userLatitude > 90) errors.push("Latitude must be between -90 and 90.");
        if (userLongitude < -180 || userLongitude > 180) errors.push("Longitude must be between -180 and 180.");

        // If any errors exist, return them
        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation failed.", errors });
        }

        // Fetch schools from the database
        const schools = await getSchools();

        // Calculate distance and sort schools by proximity
        const sortedSchools = schools
            .map(school => ({
                ...school,
                distance: haversineDistance(userLatitude, userLongitude, school.latitude, school.longitude)
            }))
            .sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    } catch (error) {
        console.error("Error retrieving schools:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { createSchool, listSchools };


