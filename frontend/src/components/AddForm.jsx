import { IoPersonCircle } from "react-icons/io5";
import { RiNumbersFill } from "react-icons/ri";
import DatePicker from "./DatePicker";
import Modal from "./Modal";
import { axiosInstance } from "../lib/axios";
import { useState } from "react";
import dayjs from "dayjs";



const AddForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        day: "DEFAULT",
        amount: "",
        date: "",
        newAttendees: [], // Add field for new attendees
        newAmount: "",
    });
    const [newAttendee, setNewAttendee] = useState(""); // Temporary input for a single new attendee
    const [modalConfig, setModalConfig] = useState({
        isVisible: false,
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const addNewAttendee = () => {
        if (newAttendee.trim()) {
            setFormData((prevState) => ({
                ...prevState,
                newAttendees: [...prevState.newAttendees, newAttendee.trim()],
            }));
            setNewAttendee("");
        }
    };

    const removeAttendee = (index) => {
        setFormData((prevState) => ({
            ...prevState,
            newAttendees: prevState.newAttendees.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedDate = dayjs(formData.date).startOf("day").toISOString();
            const formDataToSend = { ...formData, date: formattedDate };

            const response = await axiosInstance.post("/submit", formDataToSend);

            if (response.data.status === "exists") {
                setModalConfig({
                    isVisible: true,
                    message: "Record already exists: " + response.data.message,
                });
            } else {
                setModalConfig({
                    isVisible: true,
                    message: "Data submitted successfully!",
                });
            }
        } catch (error) {
            if (error.response?.status === 400 && error.response?.data.message === "All fields are required") {
                const requiredMessage = "All fields required except";
                const optionalFields = ['"New Attendance"', '"New Attendance Count"'];

                setModalConfig({
                    isVisible: true,
                    message: `${requiredMessage} ${optionalFields.join(' & ')}`,
                });
            } else {
                console.error("Error submitting data:", error.response?.data || error.message);
                setModalConfig({
                    isVisible: true,
                    message: "An error occurred: " + (error.response?.data.message || error.message),
                });
            }
        }
    };


    const handleModalClose = () => {
        setModalConfig({ isVisible: false, message: "" });
        if (modalConfig.message.includes("successfully")) {
            window.location.reload();
        }
    };

    return (
        <div className="relative container mx-auto w-full md:w-1/2 mt-12 p-6">
            {/* Modal */}
            <Modal
                isVisible={modalConfig.isVisible}
                message={modalConfig.message}
                onConfirm={handleModalClose}
            />

            {/* Form */}
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-center">
                    Enter Church Count
                </h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 my-6">
                {/* Enter Name */}
                <div className="mx-auto w-9/12">
                    <label className="block mb-2 text-md font-semibold">Usher&apos;s Name</label>
                    <div className="relative w-full">
                        <IoPersonCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-black rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Type here..."
                        />
                    </div>
                </div>

                {/* Select Day */}
                <div className="mx-auto w-9/12">
                    <label className="block mb-2 text-md font-semibold">Select Day</label>
                    <select
                        name="day"
                        value={formData.day}
                        onChange={handleChange}
                        className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-sm border border-black rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    >
                        <option value="DEFAULT" disabled>
                            Select a day...
                        </option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>

                {/* Enter Amount */}
                <div className="mx-auto w-9/12">
                    <label className="block mb-2 text-md font-semibold">Enter Amount</label>
                    <div className="relative w-full">
                        <RiNumbersFill className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-black rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Type here..."
                        />
                    </div>
                </div>

                {/* Date Picker */}
                <DatePicker
                    value={formData.date}
                    onChange={(selectedDate) => {
                        setFormData((prev) => ({ ...prev, date: selectedDate }));
                    }}
                />

                {/* New Attendees */}
                <div className="mx-auto w-9/12">
                    <label className="block mb-2 text-md font-semibold">New Attendees Names</label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={newAttendee}
                            onChange={(e) => setNewAttendee(e.target.value)}
                            className="w-full pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-black rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Enter a name"
                        />
                        <button
                            type="button"
                            onClick={addNewAttendee}
                            className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-500"
                        >
                            Add
                        </button>
                    </div>
                    {/* Display New Attendees */}
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData.newAttendees.map((attendee, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md shadow cursor-pointer"
                                onClick={() => removeAttendee(index)}
                            >
                                {attendee} &times;
                            </span>
                        ))}
                    </div>
                </div>

                {/*new attendance amount*/}
                <div className="mx-auto w-9/12">
                    <label className="block mb-2 text-md font-semibold">New Attendees Amount</label>
                    <div className="relative w-full">
                        <RiNumbersFill className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
                        <input
                            type="number"
                            name="newAmount"
                            value={formData.newAmount}
                            onChange={handleChange}
                            className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-black rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Type here..."
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mx-auto w-9/12">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddForm;
