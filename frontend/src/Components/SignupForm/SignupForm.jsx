import React, { useState } from "react";
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const SignupForm = () =>{
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");

        navigate('/');
    }

    const backToLogin = () => {
        navigate('/')
    }
    return (
        <div className='wrapper'>
            < form onSubmit={handleSubmit}>
            <h1> Create Account </h1>
            <div className="input-box">
                <input type="text" placeholder='Username' required />
                <FaUser className="icon" />
            </div>
            <div className="input-box" >
                <input type="password" placeholder='Password' required value={password} 
                onChange={(e) => setPassword(e.target.value)} />
                <FaLock className="icon"/>
            </div>
            <div className="input-box" >
                <input type="password" placeholder='Retype Password' required value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
                <FaLock className="icon"/>
            </div>
            {error && <p className="error">{error}</p>}
            < button type="submit"> Create Account </button>
        </form>
        <button onClick={backToLogin} className="back-to-login-button">
            Back to Login
        </button>
    </div>
    );
};
export default SignupForm;