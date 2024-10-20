import DisplayResume from "./DisplayResume";
import ResumeData from "./ResumeData";
import React from 'react';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import SearchExistingData from './SearchExistingData';
import DisplayExistingResume from "./DisplayExistingResume";
import AboutUs from './AboutUs';
import ContactUs from "./ContactUs";
import ContactUss from "./ContactUss";
import Help from "./Help";
import MobileViewHome from "./MobileViewHome";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  return (
    <>
     <Router >
       <div className="max-w-screen">
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/help" element={<Help/>} />
                <Route path="/resume" element={<ResumeData/>} />
                <Route path="/displayresume" element={<DisplayResume/>} />
                <Route path="/search" element={<SearchExistingData/>} />
                <Route path="/displayexistingresume" element={<DisplayExistingResume/>} />
                <Route path="/aboutus" element={<AboutUs/>} />    
                <Route path="/contactus" element={<ContactUs/>} />
                <Route path="/contactuss" element={<ContactUss/>} />
            </Routes>
         </div>
        </Router>
    </>
  );
}

export default App;
