// models/Attendance.js
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    day: { type: String, required: true },
    amount: { type: Number, required: false },  // Wednesday Attendance Amount (Optional)
    amAmount: { type: Number, required: false },  // AM Attendance for Sunday (Optional)
    pmAmount: { type: Number, required: false },  // PM Attendance for Sunday (Optional)
    newAttendees: { type: [String], default: [] },  // Array of new attendees (Optional)
    newAmount: { type: Number, default: 0 }, // New attendees' amount (Optional)
});

export default mongoose.model('Attendance', attendanceSchema);
