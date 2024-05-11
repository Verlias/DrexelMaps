import { useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import styles from "./Login.module.css";

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
    /*
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      
      try {
          const response = await axios.post("http://localhost:3000/api/login", userData);
          console.log("Response from server:", response.data);
          
          const { token } = response.data;
          if (token) {
              localStorage.setItem('token', token);
              console.log("Token stored in localStorage:", token);
              navigate('/Profile');
          } else {
              console.log("Token not received from server");
              // Handle error: token not received
          }
      } catch (error) {
          setPasswordError("The password you entered is not correct");
          console.error("Error during login:", error);
      }
  };
  */

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
        // Send user input to the backend using Axios POST request
        const response = await axios({
          url: "http://localhost:3000/api/login",
          method: "POST",
          data: userData
        });
        console.log(response.data); // Log response from the backend
        const { token } = response.data
        localStorage.setItem('token', token);
        navigate('/Profile');
    } catch (error) {
        setPasswordError("The password you entered is not correct");
        console.log("User does not exist");
    }
};

  
  

    return (
        <>
        <Header></Header>
        <form className={styles.LoginForm} onSubmit={handleSubmit}>
            <div>
                <h1>Login</h1>
                <label className={styles.LoginLabel}>Email:</label>
                  <input className={styles.LoginInput}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email here"
                  value={userData.email}
                  onChange={handleChange}
                  required/>
                <label className={styles.LoginLabel}>{emailError}</label>

                <label className={styles.LoginLabel}>Password:</label>
                  <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Enter your password here"
                  value={userData.password}
                  onChange={handleChange}
                  required/>
                <label className={styles.LoginLabel}>{passwordError}</label>
                
                <button className={styles.LoginButtons} type="submit"><Link className={styles.SignUpLink} to="/SignUp">SignUp</Link></button>
                <button className={styles.LoginButtons} type="submit" onClick={onButtonClick}>Log In</button>
            </div>
        </form>
        </>
    )
}

export default Login;