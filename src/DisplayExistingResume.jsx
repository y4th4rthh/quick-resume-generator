import React, { useEffect, useState } from 'react';
import Headerr from './Header';
import axios from 'axios';
import htmlpdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';
import errorcat from './errorcat.gif';
import MobileViewHome from './MobileViewHome';
import { useNavigate } from 'react-router-dom';


const DisplayExistingResume = () => {
    const [resumeData, setResumeData] = useState(null);
    const location = useLocation();
    const { usrData } = location.state;
    const navigate = useNavigate();
    // const [isMobile, setIsMobile] = useState(false);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsMobile(window.innerWidth <= 768);
    //     };
    //     handleResize();
    //     window.addEventListener('resize', handleResize);

    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    // if (isMobile) {
    //     return (
    //         <div>
    //             <MobileViewHome/>
    //         </div>
    //     );
    // }


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
        navigate('/resume', { state: { editData : resumeData } });
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
            <div className='flex-row justify-center w-screen font-rubik mb-4' style={{ paddingTop: '7rem' }}>
                <div className='container'>
                </div>
                <div className='m-12'>
                    <p className="text-black sm:text-5xl text-center font-bold">Resume Auto Generator</p>

                </div>
                <div className=' rounded-lg flex justify-center ml-1.5 mr-1.5' >
                    <div className='container-fluid sm:flex sm:justify-center bg-gray-100' id='tableContent' style={{  paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px', pageBreakInside: 'avoid',overflowX:'scroll',  msOverflowStyle: 'none', scrollbarWidth: 'none'  }}>

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
                        className="bg-[#4e31aa] hover:bg-[#372379] hidden sm:block rounded-md py-2 px-4 w-half text-white "
                        onClick={handleDownloadPDF}
                    >
                        Download Resume
                    </button>

                    <button

                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200 py-2 px-4 w-half text-white"
                         onClick={handleEditData}
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


                <div className='mt-12'>
                    <marquee style={{ whiteSpace: 'nowrap', animation: 'scroll 20s linear infinite' }}>
                        <ol className="text-[#4e31aa] font-semibold text-sm text-right p-0 m-0 list-none hidden sm:block">
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

                        <ol className="text-[#4e31aa] font-semibold text-sm text-right p-0 m-0 list-none sm:hidden">
                    
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> Download your resume from the PC devices as we currently dont support downloads on mobile/tablet devices!!.
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
