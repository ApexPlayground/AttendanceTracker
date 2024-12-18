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
        required: true,
        default: Date.now
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
