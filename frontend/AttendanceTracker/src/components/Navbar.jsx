import { useState } from "react";
import logo from "../assets/imgs/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";


const Navbar = () => {
    // State to track whether the menu is open or closed
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <>
            <nav className={"relative container mx-auto p-6"}>
                <div className={"flex items-center justify-between"}>
                    {/*Logo*/}
                    <div className="logo h-16 w-16">
                        <img src={logo} alt="logo" />
                    </div>

                    {/*Nav links*/}
                    <div className={"hidden md:flex space-x-6"}>
                        <a href={"#"}> Add </a>
                        <a href={"#"}> View Attendance </a>
                        <a href={"#"}> Charts</a>
                        <a href={"#"}> Tutorial</a>
                    </div>
                    <div className="block md:hidden">
                        <button onClick={toggleMenu}>
                            {isMenuOpen ? (<IoMdClose className="font-bold text-2xl" />) : (<RxHamburgerMenu className="font-bold text-2xl" />)}

                        </button>
                    </div>
                </div>

                {/**Mobile menu view */}
                <div
                    className={`${isMenuOpen ? "block" : "hidden"} md:hidden space-y-4 mt-4`}>
                    <a href={"#"} className="block text-center"> Add </a>
                    <a href={"#"} className="block text-center"> View Attendance </a>
                    <a href={"#"} className="block text-center"> Charts </a>
                    <a href={"#"} className="block text-center"> Tutorial </a>
                </div>

            </nav>


        </>
    )
}
export default Navbar