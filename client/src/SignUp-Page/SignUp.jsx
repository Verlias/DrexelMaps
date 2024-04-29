import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import styles from "./SignUp.module.css";
import Header from "../Components/Header.jsx";
import { useNavigate } from "react-router-dom";

function SignUp() {
    // State to store form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();
    // Function to handle changes in form fields
    const handleChange = (e) => {
        // Update formData state with the new value of the changed input field
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Send form data to the backend using Axios POST request
            const response = await axios.post("http://localhost:3000/api/signup", formData);
            console.log(response.data); // Log response from the backend
            if (response.status === 200) navigate('/Profile');
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

  return (
    <>
      <Header />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <h1 className={styles.header}>Sign Up</h1>

          <label className={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className={styles.label}>Re-enter Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="cancel" onClick={() => {}}>
            Cancel
          </button>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
