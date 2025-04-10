import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import FrontPage from './Components/FrontPage';
import Notes from './Components/Notes';
import About from './Components/About';
import CSCluster from './Components/CSCluster';
import MECluster from './Components/MechCluster';
import ECCluster from './Components/ElectricalCluster';
import Tnc from './Components/Tnc'; 
import PrivacyPolicy from './Components/PrivacyPolicy'; 
import Contact from './Components/Contact';
import PYQ from './Components/PYQ';
import Lab from './Components/Lab';
import PYQ2ndYear from './Components/PYQ2';
import CSE2 from './Components/CSE2';
import ECE2 from './Components/ECE2';
import ISE2 from './Components/ISE2';
import ETE2 from './Components/ETE2';
import SignUp from "./Components/SignUp";
import PdfViewer from "./Components/PDFViewer";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate hook


  // You can check for JWT token in localStorage to see if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Check for JWT token in localStorage
    if (token) {
      setIsAuthenticated(true);  // Set authentication state to true
    } else {
      setIsAuthenticated(false); // Set authentication state to false
    }
  }, []);

  // Redirect to home page if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (

      <div className='App'>
        <Routes>
          
          <Route path="/" element={<FrontPage />} />
          <Route path="/about" element={<About /> } />
          <Route path="/notes" element={<Notes /> } />
          <Route path="/CSCluster" element={<CSCluster /> } />
          <Route path="/MECluster" element={ <MECluster/>} />
          <Route path="/ECCluster" element={ <ECCluster/>} />
          <Route path="/Tnc" element={<Tnc/>} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy /> } />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/pyq" element={ <PYQ />} />
          <Route path="/lab" element={ <Lab/> } />
          <Route path="/pyq2" element={<PYQ2ndYear/> } />
          <Route path="/CSE2" element={<CSE2 />} />
          <Route path="/ECE2" element={<ECE2 />} />
          <Route path="/ISE2" element={<ISE2 /> }/>
          <Route path="/ETE2" element={ <ETE2 />} />

          
          
        </Routes>
      </div>
  );
}

export default App;

