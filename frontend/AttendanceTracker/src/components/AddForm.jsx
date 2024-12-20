import { IoPersonCircle } from "react-icons/io5";
import { RiNumbersFill } from "react-icons/ri";
import DatePicker from "./DatePicker";
import Modal from "./Modal";
import axios from "axios";
import { useState } from "react";
import dayjs from "dayjs"; // Import dayjs to format the date

const AddForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        day: "DEFAULT",
        amount: "",
        date: ""
    });
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Format the date before sending to the backend
            const formattedDate = dayjs(formData.date).startOf("day").toISOString();
            const formDataToSend = { ...formData, date: formattedDate };

            const response = await axios.post("http://localhost:5000/submit", formDataToSend);

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
            console.error("Error submitting data:", error.response?.data || error.message);
            setModalConfig({
                isVisible: true,
                message: "An error occurred while submitting the data. Please try again.",
            });
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
                    <label className="block mb-2 text-md font-semibold">Enter Name</label>
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
                {/* DatePicker */}
                <DatePicker
                    value={formData.date}
                    onChange={(selectedDate) => {
                        setFormData((prev) => ({ ...prev, date: selectedDate }));
                    }}
                />
                <div className="mx-auto w-9/12">
                    <button
                        type="submit"
                        className="w-full mt-8 bg-green-600 font-semibold text-white py-2 rounded-md hover:bg-green-500 transition"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddForm;
