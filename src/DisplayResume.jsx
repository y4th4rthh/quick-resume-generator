import React, { useEffect, useState } from 'react';
import Headerr from './Header';
import axios from 'axios';
import htmlpdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';

const DisplayResume = () => {
    const [resumeData, setResumeData] = useState(null);
    const location = useLocation();
    const { usrData } = location.state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data for:', usrData.color);
                const response = await axios.get(`http://localhost:5000/api/resumeData?email=${usrData.email}`);
                const filteredData = response.data.find(item => item.email === usrData.email);
                setResumeData(filteredData);
                console.log('Fetched resumeData:', filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [usrData.email]);

    useEffect(() => {
        console.log('Updated resumeData:', resumeData);
      

    }, [resumeData]);

    const headerStyle = {
        color: usrData.choosecolor || '#4e31aa',
      };

      const headerListStyle = {
        color: usrData.choosecolor || '#4e31aa',
      };

    

    const handleDownloadPDF = () => {
        const element = document.getElementById('tableContent');

        const elementHeight = element.offsetHeight;
        const elementWidth = element.offsetWidth;
    
        const pageHeightInInches = (elementHeight +1) / 96;
        const pageWidthInInches = (elementWidth +1) / 96;
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
        return <div>Loading...</div>;
    }

    return (
        <div className='font-rubik'>
            <Headerr />
            <div className='flex-row justify-center mt-12 font-rubik mb-4' style={{ marginTop: '7rem' }}>
                <div className='container'>
                </div>
                <div className='m-12'>
                    <p className="text-black-500 text-5xl text-center font-bold">Resume Auto Generator</p>

                </div>
                <div className='rounded-lg flex justify-center' style={{ marginLeft: '20%', marginRight: '20%' }}>
                    <div className='container-fluid bg-gray-100' id='tableContent' style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px',paddingBottom:'20px', pageBreakInside: 'avoid' }}>

                        <table id="mytable" className='bg-white' style={{ borderCollapse: 'collapse', width: '250mm', height: '290mm', border: '0px solid gray', pageBreakInside: 'avoid' }}>

                            <tbody>
                                <tr>
                                    <td className='bg-gray-100' style={{border:'1px solid white'}} >
                                        <div className="text-gray-700 bg-gray-100">
                                            <header className="max-w-screen-lg mx-auto p-5">
                                                <h1 className="text-center text-2xl font-medium uppercase " style={headerStyle}>{resumeData.fullName}</h1>
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
                                                                <p className="text-gray-700 text-sm ml-2">{resumeData.lang1}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <h3 className="font-medium text-[#4e31aa]" style={headerStyle}> {resumeData.project2}</h3>
                                                        <p className="text-gray-700"> {resumeData.projectdes2}</p>
                                                        <div>
                                                            <h5 className='text-sm font-medium uppercase  mt-3 pb-2 text-black'>• Technlogies used:</h5>
                                                            <div className='flex flex-wrap justify-start '>
                                                                <p className="text-gray-700 text-sm ml-2">{resumeData.lang2}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <h3 className="font-medium text-[#4e31aa]" style={headerStyle}> {resumeData.project3}</h3>
                                                        <p className="text-gray-700"> {resumeData.projectdes3}</p>
                                                        <div>
                                                            <h5 className='text-sm font-medium uppercase  mt-3 pb-2 text-black'>• Technlogies used:</h5>
                                                            <div className='flex flex-wrap justify-start '>
                                                                <p className="text-gray-700 text-sm ml-2">{resumeData.lang3}</p>
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

                <div className='flex justify-center mt-12 mb-12'>
                    <button
                        type="button"
                        className="bg-[#4e31aa] hover:bg-[#372379] rounded-md py-2 px-4 w-half text-white "
                        onClick={handleDownloadPDF}
                    >
                        Download Your Resume
                    </button>
                </div>
                <div className='mt-12'>
                    <marquee style={{ whiteSpace: 'nowrap', animation: 'scroll 20s linear infinite' }}>
                        <ol className="text-gray-700 font-semibold text-sm text-right p-0 m-0 list-none">
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> Click the "Download Hall Ticket" button above for downloading.
                            </li>
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> Verify that all information on the hall ticket is correct.
                            </li>
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> If any information is incorrect in the ticket, please contact support.
                            </li>
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> Print a physical copy of the hall ticket for the examination.
                            </li>
                            <li className="inline-block ml-2">
                                <span className="bullet">•</span> If you encounter any issues during the download process, please contact support.
                            </li>
                        </ol>
                    </marquee>
                </div>

            </div>
            <div className="flex justify-center bg-white  fixed bottom-0 w-full z-20 border-t border-gray-200 py-2" style={{ height: '70px' }}>
                <div className="text-sm mt-4 text-black">
                    Made with ❤️ by <a href="https://www.bing.com/videos/riverview/relatedvideo?q=roll+rick+astley&mid=4E7B1C0F8E67E9F7B1364E7B1C0F8E67E9F7B136&FORM=VIRE" className='text-[#4e31aa]'>y4th4rthh</a>
                </div>
            </div>
        </div >

    );
};

export default DisplayResume;
