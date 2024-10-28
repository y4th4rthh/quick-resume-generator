import React, { useEffect, useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { ToastContainer,toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import MobileViewHome from './MobileViewHome';

const ResumeData = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { editData } = location.state || {};
    // const { usrData } = location.state;
    const [greeting, setGreeting] = useState('');

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


    useEffect(() => {
        setGreeting(getGreeting());

    }, []);

    

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 12) {
            return 'Good Morning';
        } else if (hour >= 12 && hour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };


    const [formData, setFormData] = useState({
        fullName: '',
        dept: '',
        phone: '',
        email: '',
        gitlink: '',
        summary: '',
        graduationInstitute: '',
        graduationQualification: '',
        graduationYear: '',
        twelfthInstitute: '',
        twelfthQualification: '',
        twelfthYear: '',
        skillsFE: '',
        skillsBE: '',
        skillsOther: '',
        lang1: '',
        lang2: '',
        lang3: '',
        project1: '',
        project2: '',
        project3: '',
        projectdes1: '',
        projectdes2: '',
        projectdes3: '',
        choosecolor: '',
    });

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [summaryError, setSummaryError] = useState('');
    const [graduationYearError, setGraduationYearError] = useState('');
    const [twelfthYearError, setTwelfthYearError] = useState('');
    const [skillsFEError, setSkillsFEError] = useState('');
    const [skillsBEError, setSkillsBEError] = useState('');
    const [skillsOtherError, setSkillsOtherError] = useState('');
    const [lang1Error, setLang1Error] = useState('');
    const [lang2Error, setLang2Error] = useState('');
    const [lang3Error, setLang3Error] = useState('');
    const [prodes1Error, setProDes1Error] = useState('');
    const [prodes2Error, setProDes2Error] = useState('');
    const [prodes3Error, setProDes3Error] = useState('');
    const [loading, setLoading] = useState(false);
    

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
            case 'phone':
                if (value.length !== 10) {
                    setPhoneError('Phone number must be exactly 10 digits');
                } else {
                    setPhoneError('');
                }
                break;
            case 'summary':
                if (value.length > 300) {
                    
                }
                else if(value.length<200)
                {
                   
                }
                 else {
                    setSummaryError('');
                }
                break;
            case 'graduationYear':
                if (!/^\d+$/.test(value)) {
                    setGraduationYearError('Graduation year must be a number');
                } else {
                    setGraduationYearError('');
                }
                break;
            case 'twelfthYear':
                if (!/^\d+$/.test(value)) {
                    setTwelfthYearError('Twelfth year must be a number');
                } else {
                    setTwelfthYearError('');
                }
                break;
            case 'skillsFE':
                if (!/^[A-Za-z]+$/.test(value)) {
                    setSkillsFEError('Skills Frontend must contain only alphabetic characters');
                } else {
                    setSkillsFEError('');
                }
                break;
            case 'skillsBE':
                if (!/^[A-Za-z]+$/.test(value)) {
                    setSkillsBEError('Skills Backend must contain only alphabetic characters');
                } else {
                    setSkillsBEError('');
                }
                break;
            case 'skillsOther':
                if (!/^[A-Za-z]+$/.test(value)) {
                    setSkillsOtherError('Other Skills must contain only alphabetic characters');
                } else {
                    setSkillsOtherError('');
                }
                break;
            case 'lang1':
                if (!/^[A-Za-z]+$/.test(value)) {
                    setLang1Error('Technologies must contain only alphabetic characters');
                } else {
                    setLang1Error('');
                }
                break;

            case 'lang2':
                if (!/^[A-Za-z]+$/.test(value)) {
                    setLang2Error('Technologies must contain only alphabetic characters');
                } else {
                    setLang2Error('');
                }
                break;
            case 'lang3':
                if (!/^[A-Za-z]+$/.test(value)) {
                    setLang3Error('Technologies must contain only alphabetic characters');
                } else {
                    setLang3Error('');
                }
                break;
            case 'projectdes1':
                if (value.length > 300) {
                    
                } else {
                    setProDes1Error('');
                }
                break;
            case 'projectdes2':
                if (value.length > 300) {
                    
                } else {
                    setProDes2Error('');
                }
                break;
            case 'projectdes3':
                if (value.length > 300) {
                  
                } else {
                    setProDes3Error('');
                }
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        console.log('Updated resumeData:', editData);
       if(editData)
       {
        setFormData(editData);
        console.log(formData.email);
       }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailError && !phoneError && !summaryError && !graduationYearError && !twelfthYearError && !skillsBEError && !skillsFEError && !skillsOtherError && !lang1Error && !lang2Error && !lang3Error && !prodes1Error && !prodes2Error && !prodes3Error) {
            if (
                formData.email.length !== 0 
                
            ) {
                try {
                    const response = await fetch('https://quick-resume-backend.onrender.com/api/resume', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });
            
                    if (!response.ok) {
                        toast("Email already exists. Please use a different email.", {
                            position: "bottom-right",
                            transition: Slide,
                        });
                        throw new Error('Failed to save resume data');
                        setLoading(false);
                    }
            
                    const data = await response.json();
                    console.log(data);

                navigate('/displayresume', { state: { usrData: formData } });
                }
                catch (error) {
                    console.error('Error saving resume data:', error.message);
                    // Handle error (show alert, etc.)
                }
            }
            else {
                toast("Form looks empty. Please fill them before submitting", {
                    position: "bottom-right",
                    transition: Slide,
                });
            }
        }
         else {
            toast("Form has errors. Please fix them before submitting.", {
                position: "bottom-right",
                transition: Slide,
            });
        }
    };

    const handleLogin = () => {
        navigate('/');
    }

    const handleNavigateToSearch = () => {
        navigate('/search');
    };

    return (
        <div className='font-rubik bg-[#F3F4F6]'>
            <ToastContainer />
            <nav
                className="bg-white   w-full z-20  start-0 border-b border-gray-200 "
            >
                <div
                    className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
                >
                    <a
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap text-[#4e31aa]  "
                        >
                            QuickResume
                        </span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            type="button"
                            className="text-white bg-[#4e31aa] hover:bg-[#372379] focus:ring-4 focus:outline-none focus:ring-[#4e31aa] font-medium rounded-lg text-sm px-4 py-2 text-center "
                            onClick={handleLogin}
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
                            className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white "
                        >
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-3 text-[#4e31aa] hover:text-[#4e31aa] bg-[#4e31aa] rounded md:bg-transparent  md:text-[#4e31aa] md:p-0 "
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={handleNavigateToSearch}
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[#4e31aa]  md:p-0 "
                                >
                                    Search Resume
                                </a>
                            </li>

                            <li>
                                <a
                                   onClick={() => navigate('/contactuss')}
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 hover:text-[#4e31aa] "
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {isOpen && (
                    <div
                        ref={dropdownRef}
                        className="transform transition-transform duration-300 ease-in-out items-center justify-between md:hidden w-full  md:w-auto md:order-1"
                        id="navbar-sticky"
                    >
                        <ul
                            className="flex flex-row p-1 text-sm md:p-0 mt-4 justify-between font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white "
                        >
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-3 text-white bg-[#4e31aa] rounded md:bg-transparent hover:text-white  md:text-[#4e31aa] md:p-0 "
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={handleNavigateToSearch}
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4e31aa] hover:text-[#4e31aa]  md:p-0 "
                                >
                                    Search Resume
                                </a>
                            </li>

                            <li>
                                <a
                                   onClick={() => navigate('/contactuss')}
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:hover:text-[#4e31aa] hover:text-[#4e31aa] "
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    )}
                </div>
            </nav>

            <div className="font-rubik flex justify-center mb-11 sm:min-h-screen" style={{ width: '100%',  backgroundColor: '#f3f4f6', paddingTop: '7rem'}}>

                <div className="flex-row sm:bg-[#ffffff]" style={{ position: 'relative', padding: '4rem', width: '1000px', minWidth: '20rem', marginBottom: '3rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '1rem' }}>

                    <div className="head text-xl sm:text-4xl font-bold flex justify-center mb-8 text-black">
                        Enter Your Details
                    </div>
                    <div className='mb-5 text-2xl m-auto text-gray-600' style={{marginLeft:'7%'}}>{greeting}</div>
                    {/* , {usrData.fullName} */}
                    <div className="sub-head text-sm flex flex-wrap">
                        <div className="sm:min-w-[20rem]" style={{ margin: '0 auto' }}>
                            <div style={{ marginBottom: '1.4rem' }}>
                                <label htmlFor="fname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Full Name <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fullName"
                                    value={formData.fullName}
                                    className=" bg-gray-100 text-black"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out', color: '#000' }}
                                    placeholder="Enter Your Full Name"
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '1.4rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Department/Branch Name <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="lname"
                                    name="dept"
                                    value={formData.dept}
                                    className=" bg-gray-100 text-black"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Enter Your Branch Name"
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '1.4rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Phone Number  <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    className=" bg-gray-100 text-black"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Enter Your Phone Number"
                                    required
                                />

                            </div>

                            <div style={{ marginBottom: '1.4rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Email Address  <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    className=" bg-gray-100 text-black"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Enter Your Email Address"
                                    required
                                />

                            </div>

                            <div style={{ marginBottom: '1.4rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Github Link (if any)  <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="gitlink"
                                    name="gitlink"
                                    value={formData.gitlink}
                                    className=" bg-gray-100 text-black"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Enter Your Github Link"
                                    required
                                />

                            </div>

                            <div style={{ marginBottom: '1.4rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Summary/About Yourself  <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="summary"
                                    name="summary"
                                    value={formData.summary}
                                    className=" bg-gray-100 text-black"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Describe Yourself"
                                    required
                                />

                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Graduation Qualification <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="graduationInstitute"
                                    name="graduationInstitute"
                                    value={formData.graduationInstitute}
                                    onChange={handleInputChange}
                                    className="mb-2 bg-gray-100 text-black"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Institute Name"
                                    required
                                />
                                <input
                                    type="text"
                                    id="graduationQualification"
                                    name="graduationQualification"
                                    value={formData.graduationQualification}
                                    onChange={handleInputChange}
                                    className="mb-2 bg-gray-100 text-black"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Qualification Name, Degree (Percentage%)"
                                    required
                                />

                                <input
                                    type="text"
                                    id="graduationYear"
                                    name="graduationYear"
                                    value={formData.graduationYear}
                                    className="mb-2 bg-gray-100 text-black"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="(Year of Passing)"
                                    required
                                />

                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    12th Qualification <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="twelfthInstitute"
                                    name="twelfthInstitute"
                                    value={formData.twelfthInstitute}
                                    onChange={handleInputChange}
                                    className="mb-2 bg-gray-100 text-black"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Institute Name"
                                    required
                                />
                                <input
                                    type="text"
                                    id="twelfthQualification"
                                    name="twelfthQualification"
                                    className="mb-2 bg-gray-100 text-black"
                                    value={formData.twelfthQualification}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Qualification Name, Degree (Percentage%)"
                                    required
                                />

                                <input
                                    type="text"
                                    id="twelfthYear"
                                    name="twelfthYear"
                                    value={formData.twelfthYear}
                                    className="mb-2 bg-gray-100 text-black"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="(Year of Passing)"
                                    required
                                />

                            </div>



                        </div>
                        <div style={{ maxWidth: '20rem', margin: '0 auto' }}>



                            <div style={{ marginBottom: '1.2rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Skill/Technologies Known <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="skillsFE"
                                    name="skillsFE"
                                    className="mb-2 bg-gray-100 text-black"
                                    value={formData.skillsFE}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Front End"
                                    required
                                />

                                <input
                                    type="text"
                                    id="skillsBE"
                                    name="skillsBE"
                                    className="mb-2 bg-gray-100 text-black"
                                    value={formData.skillsBE}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Back End"
                                    required
                                />

                                <input
                                    type="text"
                                    id="skillsOther"
                                    name="skillsOther"
                                    value={formData.skillsOther}
                                    className=" bg-gray-100 text-black"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Any Other"
                                    required
                                />

                            </div>

                            

                            <div style={{ marginBottom: '1.2rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Project 1 <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="project1"
                                    name="project1"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Project Name"
                                    value={formData.project1}
                                    onChange={handleInputChange}
                                    className="mb-2 bg-gray-100 text-black"
                                    required
                                />

                                <input
                                    type="text"
                                    id="projectdes1"
                                    name="projectdes1"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Project Description"
                                    value={formData.projectdes1}
                                    onChange={handleInputChange}
                                    className="mb-2 bg-gray-100 text-black"
                                    required
                                />

                                <input
                                    type="text"
                                    id="lang1"
                                    name="lang1"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Technologies used"
                                    value={formData.lang1}
                                    onChange={handleInputChange}
                                    className="mb-4 bg-gray-100 text-black"
                                    required
                                />

                            </div>

                            <div style={{ marginBottom: '1.2rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Project 2 <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="project2"
                                    name="project2"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Project Name"
                                    value={formData.project2}
                                    onChange={handleInputChange}
                                    className="mb-2 bg-gray-100 text-black"
                                    required
                                />

                                <input
                                    type="text"
                                    id="projectdes2"
                                    name="projectdes2"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Project Description"
                                    value={formData.projectdes2}
                                    onChange={handleInputChange}
                                    className="mb-2 bg-gray-100 text-black"
                                    required
                                />

                                <input
                                    type="text"
                                    id="lang3"
                                    name="lang3"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Technologies used"
                                    value={formData.lang3}
                                    onChange={handleInputChange}
                                    className="mb-4 bg-gray-100 text-black"
                                    required
                                />

                            </div>

                            <div style={{ marginBottom: '1.2rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Project 3  <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="project3"
                                    name="project3"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Project Name"
                                    value={formData.project3}
                                    onChange={handleInputChange}
                                    className="mb-2 bg-gray-100 text-black"
                                    required
                                />

                                <input
                                    type="text"
                                    id="projectdes3"
                                    name="projectdes3"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Project Description"
                                    value={formData.projectdes3}
                                    onChange={handleInputChange}
                                    className="mb-2 bg-gray-100 text-black"
                                    required
                                />

                                <input
                                    type="text"
                                    id="lang3"
                                    name="lang3"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Technologies used"
                                    value={formData.lang3}
                                    onChange={handleInputChange}
                                    className="mb-2 bg-gray-100 text-black"
                                    required
                                />

                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label htmlFor="lname" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Choose color for Template <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="choosecolor"
                                    name="choosecolor"
                                    className="mb-2 bg-gray-100 text-black"
                                    value={formData.choosecolor}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                    placeholder="Enter hexvalue"
                                    required
                                />
                            </div>

                            <div>
                                <button
                                className='bg-[#4e31aa]'
                                    type="submit"
                                    onClick={handleSubmit}
                                    style={{ width: '100%', padding: '0.75rem',  color: '#ffffff', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s ease-in-out' }}
                                >
                                    {loading ? 'Generating...' : 'Generate Resume'}
                                </button>
                            </div>



                        </div>
                    </div>

                    <div className='mt-2 flex justify-center'>
                        <div className='flex-row'>
                            {phoneError && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{phoneError}</p>}
                            {emailError && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{emailError}</p>}
                            {summaryError && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{summaryError}</p>}
                            {graduationYearError && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{graduationYearError}</p>}
                            {twelfthYearError && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{twelfthYearError}</p>}
                            {skillsFEError && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{skillsFEError}</p>}
                            {skillsBEError && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{skillsBEError}</p>}
                            {skillsOtherError && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{skillsOtherError}</p>}
                            {lang1Error && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{lang1Error}</p>}
                            {lang2Error && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{lang2Error}</p>}
                            {lang3Error && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{lang3Error}</p>}
                            {prodes1Error && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{prodes1Error}</p>}
                            {prodes2Error && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{prodes2Error}</p>}
                            {prodes3Error && <p style={{ color: '#ef4444', fontSize: '1rem', marginTop: '0.25rem' }}>{prodes3Error}</p>}
                        </div>
                    </div>

                </div>
            </div>
             <div className='mt-12'>
                    <marquee style={{ whiteSpace: 'nowrap', animation: 'scroll 20s linear infinite' }}>
                        <ol className="text-[#4e31aa] font-semibold text-sm text-right p-0 m-0 list-none">
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> Click the "Generate Resume" button above to start creating your resume.
                            </li>
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> Fill in all the required fields with accurate information.
                            </li>
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> Review your information carefully before finalizing your resume.
                            </li>
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> If you need to make changes, use the "Edit" button to update your details.
                            </li>
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> Download your resume once you're satisfied with the information provided.
                            </li>
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> For assistance or technical support, please contact our support team.
                            </li>
                        </ol>

                    </marquee>
                </div>
            
            <div className="mt-4 flex justify-center bg-white w-full z-20 border-t border-gray-200  py-2" style={{ height: '70px' }}>
                <div className="text-sm mt-4 text-black">
                    Made with ❤️ by <a href="https://www.bing.com/videos/riverview/relatedvideo?q=roll+rick+astley&mid=4E7B1C0F8E67E9F7B1364E7B1C0F8E67E9F7B136&FORM=VIRE" className='text-[#4e31aa]'>y4th4rthh</a>
                </div>
            </div>
        </div>
    );
};

export default ResumeData;
