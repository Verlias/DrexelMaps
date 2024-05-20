import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from "./Map-Page/Map.jsx";
import Login from "./Login-Page/Login.jsx"
import Layout from "./Layout-Page/Layout.jsx";
import SignUp from "./SignUp-Page/SignUp.jsx";
import Profile from './Profile-Page/Profile.jsx';
import Test from "./Test-Page/Test.jsx"



function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route index element={<Map />}/>
              <Route path="/Map" element={<Map />}/>
              <Route path="/Login" element={<Login />} />
              <Route path="/Layout" element={<Layout />}/>
              <Route path="/SignUp" element={<SignUp />}/>
              <Route path="/Profile" element={<Profile />}/>
              <Route path="/test" element={<Profile />}/>
          </Routes>
      </Router>
    </>
      
  );
}

export default App;
