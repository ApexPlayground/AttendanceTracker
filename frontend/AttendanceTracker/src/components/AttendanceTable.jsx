import { useState, useEffect } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const AttendanceTable = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5); // Number of records per page

    // Fetch attendance data when the component mounts
    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/attendance"); // Fetch data from the backend

                // Sort data by date in descending order (recent data first)
                const sortedData = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));

                setAttendanceData(sortedData); // Set sorted data into state
                setCurrentPage(1); // Reset to page 1 when new data is fetched
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchAttendanceData();
    }, []);



    // Get current records based on pagination
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = attendanceData.slice(indexOfFirstRecord, indexOfLastRecord);

    // Change page handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(attendanceData.length / recordsPerPage);

    return (
        <>
            <div className="container mx-auto w-full md:w-3/4 mt-12 p-6">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold ">Church Attendance</h1>
                </div>
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full table-auto text-sm text-left text-gray-700">
                        <thead>
                            <tr className="bg-green-600 text-white">
                                <th className="px-6 py-3 text-center">Usher</th>
                                <th className="px-6 py-3 text-center">Amount</th>
                                <th className="px-6 py-3 text-center">Day</th>
                                <th className="px-6 py-3 text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((record, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-center">{record.name}</td>
                                    <td className="px-6 py-4 text-center">{record.amount}</td>
                                    <td className="px-6 py-4 text-center">{record.day}</td>
                                    <td className="px-6 py-4 text-center">{new Date(record.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-2 text-blue-500 disabled:text-gray-400"
                    >
                        <FiChevronLeft size={24} />
                    </button>

                    <span className="flex items-center justify-center text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 py-2 text-blue-500 disabled:text-gray-400"
                    >
                        <FiChevronRight size={24} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default AttendanceTable;
