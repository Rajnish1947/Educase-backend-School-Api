const db = require('../config/db');

// Function to add a school
const addSchool = async (name, address, latitude, longitude) => {
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    
    try {
        console.log("Executing query:", query, [name, address, latitude, longitude]);
        const [result] = await db.execute(query, [name, address, latitude, longitude]);
        console.log("Insert result:", result);
        return result;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
};

// Function to get all schools
const getSchools = async () => {
    try {
        const [schools] = await db.execute('SELECT * FROM schools');
        return schools;
    } catch (error) {
        console.error("Error retrieving schools:", error);
        throw error;
    }
};

module.exports = { addSchool, getSchools };



