import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

const Header = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        navigate('/');
    }
    return (
        <nav
            className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200  font-rubik"
        >
            <div
                className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
            >
                <a
                    onClick={() => navigate('/')}
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >

                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap text-[#4e31aa] "
                    >
                        QuickResume
                    </span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="text-white bg-[#4e31aa] hover:bg-[#372379] focus:ring-4 focus:outline-none focus:ring-[#4e31aa] font-medium rounded-lg text-sm px-4 py-2 text-center"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>

                    <button onClick={toggleMenu} className="md:hidden p-1 border-none outline-none focus:outline-none bg-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-500 bg-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul
                        className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white"
                    >
                        <li>
                            <a

                                className="block py-2 px-3 text-white bg-[#4e31aa]  rounded md:bg-transparent md:text-[#4e31aa] hover:text-[#4e31aa] md:p-0 "
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[#4e31aa] md:hover:text-[#4e31aa] md:p-0"
                                onClick={() => navigate('/search')}
                            >
                                Search Resume
                            </a>
                        </li>

                        <li>
                            <a
                                onClick={() => navigate('/contactuss')}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[#4e31aa] md:hover:text-[#4e31aa] md:p-0"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                {isOpen && (
                <div
                    ref={dropdownRef}
                    className="transform transition-transform duration-300 ease-in-out items-center justify-between md:hidden w-full md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul
                        className="flex flex-row p-1 text-sm md:p-0 mt-4 font-medium border justify-between border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white"
                    >
                        <li>
                            <a

                                className="block py-2 px-3 text-white bg-[#4e31aa] rounded md:bg-transparent md:text-[#4e31aa] hover:text-white md:p-0 "
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[#4e31aa] md:hover:text-[#4e31aa] md:p-0"
                                onClick={() => navigate('/search')}
                            >
                                Search Resume
                            </a>
                        </li>

                        <li>
                            <a
                                onClick={() => navigate('/contactuss')}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[#4e31aa] md:hover:text-[#4e31aa] md:p-0"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            )}
            </div>
        </nav>

    );
}; export default Header;
