import { useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests

function Login(){
    const [userData, setUserData] = useState({
      email: "",
      password: ""
    })
    const[emailError, setEmailError] = useState("");
    const[passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const onButtonClick = () => {
      setEmailError("");
      setPasswordError("");

      if (email === ""){
        setEmailError("Please enter an email");
      }

      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)){
        setEmailError("Invalid email")
      }

      if (userData.password === ""){
        setPasswordError("Please enter a password");
      }
    }

        // Function to handle changes in form fields
    const handleChange = (e) => {
      // Update formData state with the new value of the changed input field
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };
      
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      try {
          // Send user input to the backend using Axios POST request
          const response = await axios({
            url: "http://localhost:3000/api/login",
            method: "POST",
            data: userData
          });
          if (response.status === 200) navigate('/Profile');
      } catch (error) {
          setPasswordError("The password you entered is not correct");
          console.log("User does not exist");
      }
  };

    return (
        <>
        <Header></Header>
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Login</h1>
                <label>Email:</label>
                <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email here"
                value={userData.email}
                onChange={handleChange}
                required/>
                <label>{emailError}</label>

                <label>Password:</label>
                <input
                type="text"
                id="password"
                name="password"
                placeholder="Enter your password here"
                value={userData.password}
                onChange={handleChange}
                required/>
                <label>{passwordError}</label>

                <button type="submit"><Link to="/SignUp" style={{textDecoration: "none"}}>SignUp</Link></button>
                <button type="submit" onClick={onButtonClick}>Log In</button>
            </div>
        </form>
        </>
    )
}

export default Login;