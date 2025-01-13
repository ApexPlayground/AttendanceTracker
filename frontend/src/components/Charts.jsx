import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { axiosInstance } from "../lib/axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [wednesdayData, setWednesdayData] = useState([]);
    const [sundayData, setSundayData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axiosInstance.get("/attendance");
                setAttendanceData(response.data.data);
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchAttendanceData();
    }, []);

    useEffect(() => {
        // Filter data for selected month and year
        const filteredData = attendanceData.filter(record => {
            const recordDate = new Date(record.date);
            return (
                recordDate.getMonth() + 1 === selectedMonth &&
                recordDate.getFullYear() === selectedYear
            );
        });

        setWednesdayData(filteredData.filter(record => record.day === "Wednesday"));
        setSundayData(filteredData.filter(record => record.day === "Sunday"));
    }, [attendanceData, selectedMonth, selectedYear]);

    // Chart data for Wednesdays
    const wednesdayChartData = {
        labels: wednesdayData.map(record => new Date(record.date).toLocaleDateString()),
        datasets: [
            {
                label: "Wednesday Attendance",
                data: wednesdayData.map(record => record.amount),
                backgroundColor: "rgba(34, 139, 34, 0.6)",
            },
        ],
    };

    // Chart data for Sundays
    const sundayChartData = {
        labels: sundayData.map(record => new Date(record.date).toLocaleDateString()),
        datasets: [
            {
                label: "Sunday Attendance",
                data: sundayData.map(record => record.amount),
                backgroundColor: "rgba(255, 165, 0, 0.6)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Attendance Chart",
            },
        },
    };

    return (
        <div className="container mx-auto mt-12 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Attendance Charts</h1>

            {/* Month and Year Selection */}
            <div className="mb-6 text-center">
                <select
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(Number(e.target.value))}
                    className="p-2 border rounded mr-4"
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString("default", { month: "long" })}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedYear}
                    onChange={e => setSelectedYear(Number(e.target.value))}
                    className="p-2 border rounded"
                >
                    {Array.from({ length: 5 }, (_, i) => (
                        <option key={i} value={new Date().getFullYear() - i}>
                            {new Date().getFullYear() - i}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Wednesday Chart */}
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-xl font-semibold text-center mb-4">Wednesday Attendance</h2>
                    <Bar data={wednesdayChartData} options={options} />
                </div>

                {/* Sunday Chart */}
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-xl font-semibold text-center mb-4">Sunday Attendance</h2>
                    <Bar data={sundayChartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Charts;
