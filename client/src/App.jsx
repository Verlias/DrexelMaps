import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home-Page/Home.jsx";
import Map from "./Map-Page/Map.jsx";
import Input from "./Input-Page/Input.jsx"
import Layout from "./Layout-Page/Layout.jsx";
import SignUp from "./SignUp-Page/SignUp.jsx";
import Login from './Login-Page/Login.jsx';
import Profile from './Profile-Page/Profile.jsx';



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
              <Route path="/Login" element={<Login />}/>
              <Route path="/Profile" element={<Profile />}/>
          </Routes>
      </Router>
    </>
      
  );
}

export default App;
