import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }

    const handleNavigateToAboutUs = () => {
        navigate('/aboutus');
    };

    return (

        <div className='font-rubik'>

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
                        {/* <img
                            src="https://img.icons8.com/?size=100&id=VLMGPxgLneP3&format=png&color=000000"
                            className="h-8"
                            alt="Flowbite Logo"
                        /> */}
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap text-[#4e31aa] "
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
                            Login
                        </button>
                        
                    </div>
                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 "
                        id="navbar-sticky"
                    >
                        <ul
                            className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white "
                        >


                            <li>
                                <a

                                    className="block py-2 px-3 text-[#4e31aa] bg-[#4e31aa] hover:text-[#4e31aa] rounded md:bg-transparent  md:p-0 "
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <a
                                    onClick={handleNavigateToAboutUs}
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4e31aa] md:p-0  "
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

                    <div
                        className="items-center justify-between md:hidden w-full md:w-auto md:order-1 "
                        id="navbar-sticky"
                    >
                        <ul
                            className="flex flex-row p-4 md:p-0 justify-between mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white "
                        >


                            <li>
                                <a

                                    className="block py-2 px-3 text-white bg-[#4e31aa]  rounded md:bg-transparent  md:p-0 "
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <a
                                    onClick={handleNavigateToAboutUs}
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4e31aa] md:p-0  "
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
            <div className="bg-white sm:mt-8 mt-28">
                <section className="bg-[#4e31aa] text-white text-center py-20 px-4">
                    <h1 className="text-4xl font-bold">Create Your Professional Resume in Minutes</h1>
                    <p className="mt-4 text-lg">Get hired faster with our easy-to-use resume builder.</p>
                    <button className="mt-8 bg-white text-[#4e31aa] font-bold py-2 px-6 rounded-full transition transform hover:scale-105" onClick={() => navigate('/login')}>
                        Get Started
                    </button>
                </section>

                <section className="text-center py-12 px-4">
                    <h2 className="text-2xl font-bold">Mission And Values</h2>
                    <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
                        Our mission is to empower job seekers by providing top-notch resume-building tools with a focus on simplicity, customization, and accessibility.
                    </p>
                    <div className="flex justify-center space-x-8 mt-8 animate-fadeIn">
                        <div className="transition transform hover:scale-110">
                            <h3 className="text-xl font-bold">500+</h3>
                            <p className="text-gray-700">Color Templates</p>
                        </div>
                        <div className="transition transform hover:scale-110">
                            <h3 className="text-xl font-bold">1+</h3>
                            <p className="text-gray-700">Years of Service</p>
                        </div>
                    </div>
                </section>

                <section className="bg-[#4e31aa] text-white py-12 px-4">
                    <h2 className="text-2xl font-bold text-center">Our Vision</h2>
                    <p className="mt-4 text-center max-w-2xl mx-auto">
                        To revolutionize the job application process by making it easier for everyone to create professional, standout resumes effortlessly.
                    </p>
                </section>

                <section className="text-center py-12 px-4">
                    <h2 className="text-2xl font-bold">Our Resume Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                        <div className="p-4 shadow-lg rounded-lg hover:bg-[#7769a5] bg-[#a997df]  hover:text-white transition-colors">
                            <h3 className="text-xl font-bold">Resume Templates</h3>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg hover:bg-[#7769a5] bg-[#a997df]  hover:text-white transition-colors">
                            <h3 className="text-xl font-bold">Cover Letters</h3>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg  hover:bg-[#7769a5] bg-[#a997df]  hover:text-white transition-colors">
                            <h3 className="text-xl font-bold">Job Search Tips</h3>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg hover:bg-[#7769a5] bg-[#a997df]  hover:text-white transition-colors">
                            <h3 className="text-xl font-bold">Interview Prep</h3>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-12 px-4">
                    <h2 className="text-2xl font-bold text-center">Advanced Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
                        <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold">Easy Customization</h3>
                            <p className="text-gray-700 mt-2">
                                Personalize your resume with ease using our intuitive tools.
                            </p>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold">Expert Tips</h3>
                            <p className="text-gray-700 mt-2">
                                Get insights from industry professionals to enhance your resume.
                            </p>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold">ATS-Friendly</h3>
                            <p className="text-gray-700 mt-2">
                                Ensure your resume passes through applicant tracking systems.
                            </p>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold">Multilingual Support</h3>
                            <p className="text-gray-700 mt-2">
                                Create resumes in multiple languages to expand your job search.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-[#4e31aa] text-white text-center py-12 px-4">
                    <h2 className="text-2xl font-bold">User Testimonials</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
                        <div className="p-4 shadow-lg rounded-lg bg-[#654bbb] transition-colors">
                            <p>
                                "This resume builder made the job application process so much easier. Highly recommend!"
                            </p>
                            <h3 className="mt-4 font-bold">- User A</h3>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-[#654bbb] transition-colors">
                            <p>
                                "I landed my dream job thanks to the amazing templates and tips. Thank you!"
                            </p>
                            <h3 className="mt-4 font-bold">- User B</h3>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-[#654bbb] transition-colors">
                            <p>
                                "Creating a professional resume has never been this easy. Great tool to use!"
                            </p>
                            <h3 className="mt-4 font-bold">- User C</h3>
                        </div>
                    </div>
                </section>

                <section className="text-center py-12 px-4 w-full">
                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                    <div className="mt-8">
                        <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90">
                            <h3 className="text-xl font-bold">How do I create a resume?</h3>
                            <p className="mt-2 text-gray-700">
                                You can create a resume by selecting a template and customizing it with your information through our website or mobile app.
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
                            <h3 className="text-xl font-bold">Can I download my resume?</h3>
                            <p className="mt-2 text-gray-700">
                                Yes, you can download your resume in various formats including PDF and Word.
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
                            <h3 className="text-xl font-bold">Is the service free?</h3>
                            <p className="mt-2 text-gray-700">
                                We offer both free and premium plans to suit your needs.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-[#4e31aa] text-white text-center py-12 px-4">
                    <h2 className="text-2xl font-bold">Ready to Build Your Resume?</h2>
                    <p className="mt-4 text-lg">Join thousands of satisfied users today.</p>
                    <button className="mt-8 bg-white text-[#4e31aa] font-bold py-2 px-6 rounded-full transition transform hover:scale-105" onClick={() => navigate('/login')}>
                        Get Started
                    </button>
                </section>
                <hr className='bg-blue-100'/>
                <footer className="bg-[#4e31aa] text-white text-center py-8">
                    <div className="text-sm">
                        Made with ❤️ by <a href="https://youtu.be/dQw4w9WgXcQ?si=WLP_oyA5nwSQ2dbF" className='text-white'>y4th4rthh</a>
                    </div>
                </footer>
            </div>

        </div>
    );

};

export default Home;
