import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        pass: '',
    });

    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [error, setError] = useState('');

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

            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, pass, email } = formData;

        try {
            const response = await fetch('https://quick-resume-backend.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, pass, email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const userData = await response.json();
            navigate('/resume', { state: { usrData: userData } });

        } catch (error) {
            console.error('Login failed:', error.message);
            setError(error.message);
            toast("Invalid Credentials", {
                position: "bottom-right",
                transition: Slide,
            });
        }
           
       
    };

    const handleAboutUs = () => {       
        navigate('/aboutus');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className='font-rubik'>
            <ToastContainer />  
            <nav
                className="bg-white  fixed w-full z-20 top-0 start-0 border-b border-gray-200 "
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
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="{2}"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
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
                                    onClick={() => navigate('/')}
                                    className="block py-2 px-3 text-white bg-[#4e31aa] rounded md:bg-transparent hover:text-[#4e31aa] md:text-[#4e31aa] md:p-0"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    
                                    onClick={handleAboutUs}
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4e31aa] md:p-0 "
                                >
                                    About Us
                                </a>
                            </li>

                            <li>
                                <a
                                    
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4e31aa] md:p-0 "
                                    onClick={() => navigate('/contactus')}
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="font-rubik flex justify-center " style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', paddingTop: '2rem', marginTop: '4rem' }}>

                <div className='flex-row flex-wrap justify-center my-auto'>
                    <div className="flex-row " style={{ position: 'relative', padding: '4rem', width: '100%', minWidth: '20rem', marginBottom: '3rem', backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '1rem' }}>
                        <div className="head text-xl sm:text-4xl  font-bold flex justify-center mb-8 text-black">
                            Login your Account
                        </div>

                        <div className="sub-head text-sm flex-col flex-wrap">
                            <div style={{ maxWidth: '20rem', margin: '0 auto' }}>
                                <div style={{ marginBottom: '1.2rem' }}>
                                    <label htmlFor="fname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                        Enter Name <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="fname"
                                        className='bg-gray-200'
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                        placeholder="Enter Your Full Name"
                                        required
                                    />
                                </div>


                                <div style={{ marginBottom: '1.2rem' }}>
                                    <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                        Email Address  <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className='bg-gray-200'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                        placeholder="Enter Your Email Address"
                                        required
                                    />

                                </div>

                                <div style={{ marginBottom: '1.2rem' }}>
                                    <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                        Password (if any)  <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="pass"
                                        className='bg-gray-200'
                                        name="pass"
                                        value={formData.pass}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                        placeholder="Enter Your Password"
                                        required
                                    />

                                </div>




                            </div>

                            <div className='mt-2 flex justify-center'>
                                <div className='flex-row'>
                                    {passError && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{passError}</p>}
                                    {emailError && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{emailError}</p>}

                                </div>
                            </div>

                            <div className='mt-2'>
                                <button
                                  className='bg-[#4e31aa]'
                                    type="submit"
                                    onClick={handleSubmit}
                                    style={{ width: '100%', padding: '0.75rem', color: '#ffffff', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s ease-in-out' }}
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <div className="flex justify-center bg-white fixed bottom-0 w-full z-20 border-t border-gray-200 py-2" style={{ height: '70px' }}>
                <div className="text-sm mt-4 text-black">
                    Made with ❤️ by <a href="https://www.bing.com/videos/riverview/relatedvideo?q=roll+rick+astley&mid=4E7B1C0F8E67E9F7B1364E7B1C0F8E67E9F7B136&FORM=VIRE" className='text-[#4e31aa]'>y4th4rthh</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
