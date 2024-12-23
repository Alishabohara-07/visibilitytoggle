
import React, { useState, useEffect } from 'react';
import Login1 from '../assets/login.avif';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credential, setCredential] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        document.getElementById('nameInput').focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        const { name, email, password } = credential;

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            setLoading(false);
            return;
        }

        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();
        console.log('Response:', json);

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/login');
        } else {
            setError(json.message || 'Invalid credentials');
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const isValidName = /^[a-zA-Z\s]+$/.test(credential.name);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential.email);

    const getPasswordStrength = (password) => {
        if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password) && /[^a-zA-Z\d]/.test(password)) {
            return 'Strong';
        } else if (password.length > 6) {
            return 'Medium';
        }
        return 'Weak';
    };

    const passwordStrength = getPasswordStrength(credential.password);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img className="login-img" src={Login1} alt="login illustration" />
                </div>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}

                       
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                            <i class="fa-solid fa-user"></i>
                            </span>
                            <input
                                type="text"
                                name="name"
                                id="nameInput"
                                value={credential.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your name"
                                aria-label="Enter your name"
                            />
                        </div>
                        {!isValidName && credential.name && (
                            <small className="text-danger">Name must contain only letters and spaces.</small>
                        )}

                        
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                            <i class="fa-solid fa-envelope"></i>
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={credential.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your email"
                                aria-label="Enter your email"
                            />
                        </div>
                        {!isValidEmail && credential.email && (
                            <small className="text-danger">Please enter a valid email address.</small>
                        )}

                       
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={credential.password}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="passwordInput"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={togglePasswordVisibility}
                                >
                                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                    
                                </button>
                            </div>
                            <small className={`text-${passwordStrength === 'Strong' ? 'success' : passwordStrength === 'Medium' ? 'warning' : 'danger'}`}>
                                {passwordStrength} password
                            </small>
                        </div>

                        
                        <div className="mb-3">
                            <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control"
                                id="confirmPasswordInput"
                                placeholder="Re-enter your password"
                            />
                        </div>
                        {confirmPassword && credential.password !== confirmPassword && (
                            <small className="text-danger">Passwords do not match</small>
                        )}

                      
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Submit'}
                        </button>
                        <Link className="nav-link" to="/login">Already have an account? Login</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
