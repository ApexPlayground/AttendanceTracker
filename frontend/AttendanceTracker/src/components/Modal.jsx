import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Modal = ({ isVisible, message, onConfirm }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShow(true); // Trigger the enter animation
        } else {
            // Allow the exit animation to play before removing the modal
            const timeout = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isVisible]);

    if (!isVisible && !show) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-white rounded-lg p-6 shadow-lg w-96 transform transition-transform duration-300 ${isVisible ? "scale-100" : "scale-95"}`}>
                <p className="text-center text-lg font-medium">{message}</p>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={onConfirm}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

// Define PropTypes for the Modal
Modal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default Modal;
