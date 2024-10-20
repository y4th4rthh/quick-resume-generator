import { useState } from 'react';
import React from 'react';
import { ToastContainer,toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Help = () => {
    const notify = () => {
       
        handleFormSubmit();
    };
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: '',
    });

    const [emailError, setEmailError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [messageError, setMessageError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        switch (name) {
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    setEmailError('Invalid email format');
                } else {
                    setEmailError('');
                }
                break;
            case 'fullName':
                if (value.length !== 0) {
                    setFullNameError('Password must be at least 6 characters long');
                } else {
                    setFullNameError('');
                }
                break;
            case 'message':
                if (value.length !== 0) {
                    setMessageError('Password must be at least 6 characters long');
                } else {
                    setMessageError('');
                }
                break;

            default:
                break;
        }
    };

    const handleFormSubmit = () => {

        if ( formData.email.length === 0 || formData.fullName.length === 0 || formData.message.length === 0) {
            console.log("Form has errors. Please fix them before submitting.");
            toast("Invalid Credentials", {
                position: "bottom-right",
                transition: Slide,
            });
            return;
        }
        else{
            toast("Form submitted successfully", {
                position: "bottom-right",
                transition: Slide,
            });
        }
    };

    const handleLogin = () => {
        navigate('/login');
    }




    return (

        <div className='font-rubik'>
            <ToastContainer/>
            <div className="relative flex items-top justify-center min-h-screen bg-white  sm:items-center  sm:mt-0 sm:pt-0">
                <div className="max-w-6xl mx-auto my-auto sm:px-6 lg:px-8">
                    <div className="mt-8 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-6 mr-2 bg-gray-100  sm:rounded-lg">
                                <h1 className="text-4xl sm:text-5xl text-gray-800 e font-extrabold tracking-tight">
                                    Contact Us
                                </h1>
                                <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600  mt-2">
                                    Have suggestions or need help? Fill out the form and we'll get back to you.
                                </p>
                                <div className="flex items-center mt-8 text-gray-600 ">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                        +91 1234567890
                                    </div>
                                </div>
                                <div className="flex items-center mt-4 text-gray-600 ">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                        support@resumegenerator.com
                                    </div>
                                </div>
                            </div>
                            <form
                                className="p-6 flex flex-col justify-center"
                            >
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="hidden">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Full Name"
                                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white  border border-gray-400  text-black font-semibold focus:border-[#4e31aa] focus:outline-none"
                                    />
                                </div>
                                <div className="flex flex-col mt-2">
                                    <label htmlFor="email" className="hidden">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white  border border-gray-400  text-black font-semibold focus:border-[#4e31aa] focus:outline-none"
                                    />
                                </div>
                                <div className="flex flex-col mt-2">
                                    <label htmlFor="message" className="hidden">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Your Message"
                                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white  border border-gray-400  text-black font-semibold focus:border-[#4e31aa] focus:outline-none"
                                        
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="md:w-32 bg-[#4e31aa] hover:bg-[#372379] text-white font-bold py-3 px-6 rounded-lg mt-3 transition ease-in-out duration-300"
                                    onClick={notify}
                                >
                                    Submit
                                </button>
                                <p className="leading-relaxed text-xl text-gray-900 mt-8">
                                    We value your privacy and use VeilMail.io to{" "}
                                    <a
                                        className="font-medium text-[#4e31aa] hover:text-[#4e31aa]  hover:underline"

                                    >
                                        hide email addresses from spammers
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Help;