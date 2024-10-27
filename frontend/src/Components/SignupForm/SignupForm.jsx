import React, { useState } from "react";
import styles from './SignupForm.module.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import bcrypt from "bcryptjs-react";

const SignupForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState(""); // New state for email check error

    // Function to check if email already exists in the database
    const handleEmailCheck = async () => {
        try {
            const response = await fetch(`http://localhost:8080/checkemail?email=${email}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.exists) { // Assuming the backend returns { exists: true/false }
                    setEmailError("Email already in use");
                } else {
                    setEmailError(""); // Clear error if email is not in use
                }
            } else {
                setEmailError("Unable to check email at this time. Please try again.");
            }
        } catch (error) {
            console.error('Error checking email:', error);
            setEmailError("Error checking email. Please try again.");
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (emailError) return; // Prevent submission if email error exists

        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password: hashedPassword, salt })
            });
            if (response.ok) {
                alert("Sign Up Successful");
                backToLogin()
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            alert('Something went wrong. Please try again.' + error);
        }
        setError("");
    }

    // Function to navigate back to login
    const backToLogin = () => {
        navigate('/');
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <div className={styles.inputBox}>
                    <input
                        type="text"
                        placeholder='Name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FaUser className={styles.icon} />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type="text"
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleEmailCheck} // Trigger email check when input loses focus
                    />
                    <FaUser className={styles.icon} />
                    {emailError && <p className="error">{emailError}</p>} {/* Display email error */}
                </div>
                <div className={styles.inputBox}>
                    <input
                        type="password"
                        placeholder='Password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className={styles.icon} />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FaLock className={styles.icon} />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={!!emailError}>Create Account</button>
            </form>
            <button onClick={backToLogin} className={styles.backToLoginButton}>
                Back to Login
            </button>
        </div>
    );
};

export default SignupForm;
