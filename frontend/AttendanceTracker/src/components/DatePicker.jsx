import PropTypes from "prop-types"; // Import PropTypes

const DatePicker = ({ value, onChange }) => {
    const handleChange = (event) => {
        onChange(event.target.value); // This will update formData.date in AddForm
    };

    return (
        <>
            <div className="mx-auto w-9/12">
                <label htmlFor="date" className="block mb-2 text-md font-semibold">
                    Select a Date
                </label>
                <input
                    type="date"
                    id="date"
                    value={value || ""}  // Use the value prop passed from AddForm
                    onChange={handleChange}
                    className="w-full pl-3 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-black rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                />
            </div>
        </>
    );
};

// Define prop types for validation
DatePicker.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default DatePicker;
