import { IoMdAddCircle } from "react-icons/io";
import { FaEye, FaChartArea } from "react-icons/fa";

const Hero = () => {
    return (
        <>
            <div className="relative container mx-auto w-full md:w-1/2 mt-12 p-6">
                {/* Heading */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-center">
                        The Potters House Attendance Tracker
                    </h1>
                    <p className="mt-4 text-center text-sm md:text-base text-gray-600">
                        Easily manage attendance records and analyze growth.
                    </p>
                </div>

                {/* App Menus */}

                <div className="flex flex-col space-y-8 my-6">
                    <a href="/add-attendance">
                        <div className="flex items-center justify-center bg-green-600 w-full max-w-sm mx-auto rounded-md py-4 hover:bg-green-500 transition duration-300">
                            <IoMdAddCircle className="mr-2 text-2xl" />
                            <span className="font-semibold text-base md:text-lg">
                                Add Attendance
                            </span>
                        </div>
                    </a>


                    <a href="/view-attendance">
                        <div className="flex items-center justify-center bg-green-600 w-full max-w-sm mx-auto rounded-md py-4 hover:bg-green-500 transition duration-300">
                            <FaEye className="mr-2 text-2xl" />
                            <span className="font-semibold text-base md:text-lg">
                                View Attendance
                            </span>
                        </div>
                    </a>

                    <a href="/analyse-attendance">
                        <div className="flex items-center justify-center bg-green-600 w-full max-w-sm mx-auto rounded-md py-4 hover:bg-green-500 transition duration-300">
                            <FaChartArea className="mr-2 text-2xl" />
                            <span className="font-semibold text-base md:text-lg">
                                Analyse Attendance
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Hero;
