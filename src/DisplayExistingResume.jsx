import React, { useEffect, useState } from 'react';
import Headerr from './Header';
import axios from 'axios';
import htmlpdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';
import errorcat from './errorcat.gif';
import MobileViewHome from './MobileViewHome';


const DisplayExistingResume = () => {
    const [resumeData, setResumeData] = useState(null);
    const location = useLocation();
    const { usrData } = location.state;
    const [isMobile, setIsMobile] = useState(false);
    const [isManageEditVisible, setIsManageEditVisible] = useState(false);
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

    const handleEditInputChange = (e) => {
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
                else if (value.length < 200) {

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

    const handleEditSubmit = async (e) => {
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMobile) {
        return (
            <div>
                <MobileViewHome/>
            </div>
        );
    }


    useEffect(() => {
        const fetchData = async () => {
            console.log(usrData);
            try {
                const response = await axios.get(`https://quick-resume-backend.onrender.com/api/search`, {
                    params: {
                        email: usrData.email,
                        fullName: usrData.fullName
                    }
                });

                setResumeData(response.data);


                console.log('Fetched resumeData:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [usrData.email, usrData.fullName]);

    useEffect(() => {
        console.log('Updated resumeData:', resumeData);
    }, [resumeData]);

    const val = resumeData?.choosecolor;


    const headerStyle = {
        color: val || '#4e31aa',
    };

    const headerListStyle = {
        color: val || '#4e31aa',
    };

    const handleDownloadPDF = () => {
        const element = document.getElementById('tableContent');

        const elementHeight = element.offsetHeight;
        const elementWidth = element.offsetWidth;

        const pageHeightInInches = (elementHeight + 1) / 96;
        const pageWidthInInches = (elementWidth + 1) / 96;
        const options = {
            margin: [0, 0, 0, 0],
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: [pageWidthInInches, pageHeightInInches], orientation: 'portrait' },
            filename: 'resume.pdf',
        };
        htmlpdf()
            .from(element)
            .set(options)
            .save('resume.pdf')
            .then(() => {
                const pdf = new jsPDF(options.jsPDF);
                pdf.deletePage(pdf.internal.getNumberOfPages());
            });
    };

    if (!resumeData) {
        return <div className='bg-white flex justify-center items-center h-screen'>
            <div className='flex-col gap-6 justify-center items-center '>
                <img src={errorcat} alt='error' className='w-fit' />
                <div className='text-sm mt-2 text-black font-semibold sm:text-xl'>Looks like something is wrong! Please try again :(</div>
                <div className='bg-transparent cursor-pointer  rounded-md py-2 px-4 w-half text-black underline float-right text-sm sm:text-lg' onClick={() => window.location.href = '/resume'}>Go back</div>
            </div>
        </div>;
    }


    const handleEditData = () => {
        window.location.href = '/resume';
    };

    const handleDeleteData = async () => {
        try {
            const response = await axios.delete(`https://quick-resume-backend.onrender.com/api/delete`, {
                data: {
                    email: usrData.email,
                    fullName: usrData.fullName
                }
            });
            console.log('Deleted resume:', response.data);
            window.location.href = '/resume';
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
    }


    return (
        <div className='bg-white font-rubik'>
            <Headerr />
            <div className='flex-row justify-center  font-rubik mb-4' style={{ paddingTop: '7rem' }}>
                <div className='container'>
                </div>
                <div className='m-12'>
                    <p className="text-black text-5xl text-center font-bold">Resume Auto Generator</p>

                </div>
                <div className=' rounded-lg flex justify-center' style={{ marginLeft: '20%', marginRight: '20%' }}>
                    <div className='container-fluid bg-gray-100' id='tableContent' style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px', pageBreakInside: 'avoid' }}>

                        <table id="mytable" className='bg-white' style={{ borderCollapse: 'collapse', width: '250mm', height: '290mm', border: '0px solid gray', pageBreakInside: 'avoid' }}>

                            <tbody>
                                <tr>
                                    <td className='bg-gray-100' style={{ border: '1px solid white' }} >

                                        <div className="text-gray-700 bg-gray-100">
                                            <header className="max-w-screen-lg mx-auto p-5">
                                                <h1 className="text-center text-2xl font-medium uppercase text-[#4e31aa]" style={headerStyle}>{resumeData.fullName}</h1>
                                                <nav className="mt-3">
                                                    <ul className="list-none flex justify-center space-x-5">
                                                        <li><a href="#" className="text-[#4e31aa] hover:text-blue-900" style={headerListStyle}>{resumeData.phone}</a></li>
                                                        <li><a href="#" className="text-[#4e31aa] hover:text-blue-900" style={headerListStyle}>{resumeData.email}</a></li>
                                                        <li><a href="#" className="text-[#4e31aa] hover:text-blue-900" style={headerListStyle}>{resumeData.gitlink}</a></li>
                                                    </ul>
                                                </nav>
                                            </header>
                                            <main className="max-w-screen-lg mx-auto p-5">
                                                <div className="mb-6">
                                                    <h2 className="text-md font-medium uppercase border-b border-gray-400 pb-2 text-[#4e31aa]" style={headerStyle}>Summary</h2>
                                                    <p className="mt-3 text-gray-800">{resumeData.summary}</p>
                                                </div>
                                                <div className="mb-6">
                                                    <h2 className="text-md font-medium uppercase border-b border-gray-400 pb-2 text-[#4e31aa]" style={headerStyle}>Education</h2>
                                                    <div className="mt-3">
                                                        <h3 className="font-medium text-black">• {resumeData.graduationInstitute}</h3>
                                                        <p className="text-gray-700">{resumeData.graduationQualification}</p>
                                                        <p className="text-gray-700">({resumeData.graduationYear})</p>
                                                    </div>
                                                    <div className="mt-3">
                                                        <h3 className="font-medium text-black">• {resumeData.twelfthInstitute}</h3>
                                                        <p className="text-gray-700">{resumeData.twelfthQualification}</p>
                                                        <p className="text-gray-700">({resumeData.twelfthYear})</p>
                                                    </div>

                                                </div>
                                                <div className="mb-6">
                                                    <h2 className="text-md font-medium uppercase border-b border-gray-400 pb-2 text-[#4e31aa]" style={headerStyle}>Skills</h2>
                                                    <div className="flex flex-wrap justify-between mt-3">
                                                        <div className="flex-1 mr-2">
                                                            <h5 className="font-medium text-black">• Front-End</h5>
                                                            <p className="text-gray-700">{resumeData.skillsFE} </p>
                                                        </div>
                                                        <div className="flex-1 mr-2">
                                                            <h5 className="font-medium text-black">• Back-End</h5>
                                                            <p className="text-gray-700">{resumeData.skillsBE}</p>
                                                        </div>
                                                        <div className="flex-1 mr-2">
                                                            <h5 className="font-medium text-black">• Database</h5>
                                                            <p className="text-gray-700">{resumeData.skillsOther}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-6">
                                                    <h2 className="text-md font-medium uppercase border-b border-gray-400 pb-2 text-[#4e31aa]" style={headerStyle}>Projects</h2>
                                                    <div className="mt-3">
                                                        <h3 className="font-medium text-[#4e31aa]" style={headerStyle}> {resumeData.project1}</h3>
                                                        <p className="text-gray-700"> {resumeData.projectdes1}</p>
                                                        <div>
                                                            <h5 className='text-sm font-medium uppercase  mt-3 pb-2 text-black'>• Technlogies used:</h5>
                                                            <div className='flex flex-wrap justify-start '>
                                                                <p className="text-gray-700">{resumeData.lang1}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <h3 className="font-medium text-[#4e31aa]" style={headerStyle}> {resumeData.project2}</h3>
                                                        <p className="text-gray-700"> {resumeData.projectdes2}</p>
                                                        <div>
                                                            <h5 className='text-sm font-medium uppercase  mt-3 pb-2 text-black'>• Technlogies used:</h5>
                                                            <div className='flex flex-wrap justify-start '>
                                                                <p className="text-gray-700">{resumeData.lang2}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <h3 className="font-medium text-[#4e31aa]" style={headerStyle}> {resumeData.project3}</h3>
                                                        <p className="text-gray-700"> {resumeData.projectdes3}</p>
                                                        <div>
                                                            <h5 className='text-sm font-medium uppercase  mt-3 pb-2 text-black'>• Technlogies used:</h5>
                                                            <div className='flex flex-wrap justify-start '>
                                                                <p className="text-gray-700">{resumeData.lang3}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </main>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='flex gap-4 justify-center mt-12 mb-12'>
                    <button

                        type="button"
                        className="bg-[#4e31aa] hover:bg-[#372379] rounded-md py-2 px-4 w-half text-white "
                        onClick={handleDownloadPDF}
                    >
                        Download Resume
                    </button>

                    <button

                        type="button"
                        className={`${isManageEditVisible ? 'hidden' : 'bg-blue-500 hover:bg-blue-600'} rounded-md transition duration-200 py-2 px-4 w-half text-white `}
                        onClick={() => setIsManageEditVisible(!isManageEditVisible)}
                    >
                        Edit Your Resume
                    </button>

                    <button

                        type="button"
                        className="bg-red-500 hover:bg-red-600 rounded-md py-2 px-4 w-half text-white "
                        onClick={handleDeleteData}
                    >
                        Delete Your Resume
                    </button>
                </div>

                {isManageEditVisible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="font-rubik flex justify-center mb-11 overflow-scroll" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f3f4f6', paddingTop: '3rem', marginTop: '4rem' }}>

                            <div className="flex-row " style={{ position: 'relative', padding: '4rem', width: '1000px', minWidth: '20rem', marginBottom: '3rem', backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '1rem' }}>

                                <div className="head text-xl sm:text-4xl font-bold flex justify-center mb-8 text-black">
                                    Enter Your Details
                                    <button className="bg-red-500 hover:bg-red-600 rounded-md py-2 px-4 w-half text-white" onClick={() => setIsManageEditVisible(!isManageEditVisible)}>Close</button>
                                </div>

                                <div className='mb-5 text-2xl m-auto text-gray-600' style={{ marginLeft: '7%' }}></div>
                                {/* , {usrData.fullName} */}
                                <div className="sub-head text-sm flex flex-wrap">
                                    <div style={{ maxWidth: '20rem', margin: '0 auto' }}>
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
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
                                                onChange={handleEditInputChange}
                                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' }}
                                                placeholder="Enter hexvalue"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <button
                                                className='bg-[#4e31aa]'
                                                type="submit"
                                                onClick={handleEditSubmit}
                                                style={{ width: '100%', padding: '0.75rem', color: '#ffffff', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s ease-in-out' }}
                                            >
                                                Submit
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
                    </div>
                )
                }

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

            </div>
            <div className="mt-4 flex justify-center bg-white  w-full z-20 border-t border-gray-200 py-2 " style={{ height: '70px' }}>
                <div className="text-sm mt-4 text-black">
                    Made with ❤️ by <a href="https://www.bing.com/videos/riverview/relatedvideo?q=roll+rick+astley&mid=4E7B1C0F8E67E9F7B1364E7B1C0F8E67E9F7B136&FORM=VIRE" className='text-[#4e31aa]'>y4th4rthh</a>
                </div>
            </div>
        </div >

    );
};

export default DisplayExistingResume;
