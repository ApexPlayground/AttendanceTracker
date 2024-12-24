import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    newAttendees: {
        type: [String],
        default: []
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
