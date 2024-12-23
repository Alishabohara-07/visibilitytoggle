
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login1 from '../assets/login.avif';

const Login = () => {
    const [credential, setCredential] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        const { email, password } = credential;

        if (!email || !password) {
            toast.error('All fields are required!', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'colored',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json();

            if (json.success) {
                localStorage.setItem('token', json.authToken);
                toast.success('Login successful!', {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'colored',
                });
                setCredential({ email: '', password: '' }); 
                navigate('/');
            } else {
                toast.error(json.message || 'Invalid credentials! Try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'colored',
                });
            }
        } catch (error) {
            toast.warn('Server error! Please try again later.', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'colored',
            });
        }
        setLoading(false); 
    };

    
    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential.email);

    return (
        <>
            <div className='container'>
                <div className='row'>
                  
                    <div className='col-md-6'>
                        <img className='login-img' src={Login1} alt='login illustration' />
                    </div>

                 
                    <div className='col-md-6'>
                        <form onSubmit={handleSubmit}>
                            <h2>Login</h2>

                            
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">
                                    Email address
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                    <i class="fa-solid fa-envelope"></i>
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={credential.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        id="emailInput"
                                        placeholder="Enter your email"
                                        aria-describedby="emailHelp"
                                        required
                                    />
                                </div>
                                {!isValidEmail && credential.email && (
                                    <small className="text-danger">Invalid email format</small>
                                )}
                            </div>

                            
                            <div className="mb-3">
                                <label htmlFor="passwordInput" className="form-label">
                                    Password
                                </label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={credential.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        id="passwordInput"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                    </button>
                                </div>
                            </div>

                            
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Submit'}
                            </button>
                            <Link className="nav-link mt-2" to="/signup">
                                Don’t have an account? Sign up
                            </Link>
                        </form>
                    </div>
                </div>
            </div>

            
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default Login;
