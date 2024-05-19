import React, { useState, useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { RegistrationInterface } from '../../interfaces/RegistrationInterface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';
import { FaRegUserCircle, FaRegIdBadge, FaUser, FaLock, FaCheckDouble, FaEnvelope, FaHome, FaCity, FaMapMarkerAlt, FaEnvelopeOpenText, FaGlobeAmericas, FaPhone } from 'react-icons/fa';
import { registerUser } from '../../api/authAPI';

export const Register: React.FC = () => {
    const [userData, setUserData] = useState<RegistrationInterface>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        confirmPassword: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phoneNumber: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundImage = "url('/images/register-background.png')";
        document.body.style.backgroundSize = "60%";
        document.body.style.backgroundPosition = "left bottom";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.backgroundAttachment = '';
        };
    }, []);
    

    // Validates user credentials based on defined rules
    const validateCredentials = () => {
        const { username, password, confirmPassword } = userData;

        // Check for minimum username length
        if (username.length < 8) {
            toast.error("Username must contain at least 8 characters.");
            return false;
        }

        // Check for the presence of a number or punctuation in the password
        if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
            toast.error("Password must contain a number or punctuation.");
            return false;
        }

        // Add additional validation checks as needed

        // Verify passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return false;
        }

        return true;
    };

    // Handle form submission for registration
    const handleRegister = async () => {
        if (validateCredentials()) {
            try {
                const response = await registerUser(userData);
                toast.success('Registration successful!');
                navigate("/login");
            } catch (error) {
                toast.error('Registration failed!');
                console.error(error);
            }
        }
    };

    // Handles changes to form inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // Component layout
    return (
        <div className="login register-form">
            <ToastContainer />
            <div className="text-container">
                <h1>Create Your SmileMart Account</h1>
                <h3>Sign up and start your journey to endless smiles and exclusive deals!</h3>
            </div>
            <div className="input-container">
                <FaRegUserCircle />
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            </div>
            <div className="input-container">
                <FaRegIdBadge />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            </div>
            <div className="input-container">
                <FaUser />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            </div>
            <div className="input-container">
                <FaLock />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </div>
            <div className="input-container">
                <FaCheckDouble />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            </div>
            <div className="input-container">
                <FaEnvelope />
                <input type="text" name="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="input-container">
                <FaHome />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} />
            </div>
            <div className="input-container">
                <FaCity />
                <input type="text" name="city" placeholder="City" onChange={handleChange} />
            </div>
            <div className="input-container">
                <FaMapMarkerAlt />
                <input type="text" name="state" placeholder="State" onChange={handleChange} />
            </div>
            <div className="input-container">
                <FaEnvelopeOpenText />
                <input type="text" name="zip" placeholder="Zip" onChange={handleChange} />
            </div>
            <div className="input-container">
                <FaGlobeAmericas />
                <input type="text" name="country" placeholder="Country" onChange={handleChange} />
            </div>
            <div className="input-container">
                <FaPhone />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
            </div>
            <button className="login-button" onClick={handleRegister}>Sign Up</button>
            <p className="register-link">
                Have an account? <span onClick={() => navigate("/login")}>Log in</span>
            </p>
        </div>
    );
}

export default Register;
