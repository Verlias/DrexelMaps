import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home-Page/Home.jsx";
import Map from "./Map-Page/Map.jsx";
import Input from "./Input-Page/Input.jsx"
import Layout from "./Layout-Page/Layout.jsx";
import SignUp from "./SignUp-Page/SignUp.jsx";



function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route index element={<Home />}/>
              <Route path="/Home" element={<Home />}/>
              <Route path="/Map" element={<Map />}/>
              <Route path="/Input" element={<Input />} />
              <Route path="/Layout" element={<Layout />}/>
              <Route path="/SignUp" element={<SignUp />}/>
          </Routes>
      </Router>
    </>
      
  );
}

export default App;
