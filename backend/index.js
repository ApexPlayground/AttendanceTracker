import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import Attendance from './models/Attendance.js';
import path from 'path';


config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;
const __dirname = path.resolve()

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
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}
));
app.use(json());
app.use(urlencoded({ extended: true }));


app.post('/submit', async (req, res) => {
    try {
        const { name, day, amount, date, amAmount, pmAmount, newAttendees, newAmount } = req.body;

        // Validate required fields
        if (!name || !day || !date) {
            return res.status(400).json({ message: 'Name, day, and date are required' });
        }

        // Check for specific validations based on the day
        if (day === 'Wednesday' && (amount === undefined || amount === null)) {
            return res.status(400).json({ message: 'Amount is required for Wednesday attendance' });
        }

        if (
            day === 'Sunday' &&
            (amAmount === '' || pmAmount === '')
        ) {
            return res.status(400).json({ message: 'Both AM and PM amounts are required, wait till you get evening count😉' });
        }

        // Ensure `date` is valid
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        // Check if a record with the same day and date already exists
        const existingRecord = await Attendance.findOne({ day, date: parsedDate });

        if (existingRecord) {
            return res.status(200).json({
                status: 'exists',
                message: 'Record with this day and date already exists',
                data: existingRecord,
            });
        }

        // Create and save the new attendance record
        const newAttendance = new Attendance({
            name,
            day,
            date: parsedDate,
            amount: day === 'Wednesday' ? amount : undefined,
            amAmount: day === 'Sunday' ? amAmount : undefined,
            pmAmount: day === 'Sunday' ? pmAmount : undefined,
            newAttendees: newAttendees || [],
            newAmount,
        });

        await newAttendance.save();

        return res.status(201).json({
            status: 'success',
            message: 'Attendance record saved successfully',
            data: newAttendance,
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

        // Map through records and format them if needed
        const formattedRecords = attendanceRecords.map(record => ({
            name: record.name,
            date: record.date,
            day: record.day,
            amount: record.day === 'Wednesday' ? record.amount : undefined,  // Only show amount for Wednesday
            amAmount: record.day === 'Sunday' ? record.amAmount : undefined,  // Only show amAmount for Sunday
            pmAmount: record.day === 'Sunday' ? record.pmAmount : undefined,  // Only show pmAmount for Sunday
            newAttendees: record.newAttendees || [],  // New attendees list (if available)
            newAmount: record.newAmount || 0, // New amount (if available)
        }));

        return res.status(200).json({ data: formattedRecords });
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}



// Default route for testing the server
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
