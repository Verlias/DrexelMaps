import { useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[emailError, setEmailError] = useState("");
    const[passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const onButtonClick = () => {
      setEmailError("");
      setPasswordError("");

      if (email === ""){
        setEmailError("Please enter an email");
      }

      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        setEmailError("Invalid email")
      }

      if (password === ""){
        setPasswordError("Please enter a password");
      }
    }

    return (
        <>
        <Header></Header>
        <form>
            <div>
                <h1>Login</h1>
                <label>Email:</label>
                <input
                type="text"
                id="email"
                name="name"
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
                <label>{emailError}</label>

                <label>Password:</label>
                <input
                type="text"
                id="password"
                name="password"
                placeholder="Enter your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
                <label>{passwordError}</label>
            </div>
            <button type="submit"><Link to="/SignUp" style={{textDecoration: "none"}}>SignUp</Link></button>
            <button type="submit" onClick={onButtonClick}>Log In</button>
        </form>
        </>
    )
}

export default Login;