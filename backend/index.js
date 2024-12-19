import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import Attendance from './models/Attendance.js';


config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// MongoDB Connection
connect(MONGOURL)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((error) => {
        console.error("Error connecting to DB:", error);
        process.exit(1);
    });

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// route to save attendance data
app.post('/submit', async (req, res) => {

    try {
        const { name, day, amount, date } = req.body;

        if (!name || !day || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newAttendance = new Attendance({
            name,
            day,
            amount,
            date: new Date(date),
        });

        // Save the new attendance record to MongoDB
        await newAttendance.save();

        return res.status(201).json({
            message: 'Attendance record saved successfully',
            data: newAttendance
        });
    } catch (error) {
        console.error('Error saving attendance record:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to fetch all attendance records
app.get('/attendance', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find(); // Fetch all records from the Attendance model
        return res.status(200).json({ data: attendanceRecords });
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});




// Default route for testing the server
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
