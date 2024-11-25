import { Footer } from "./Footer";
import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAPICall } from "../services/AuthService";
import { toast } from "react-toastify";


function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const showToast = (message, type = 'error') => {
        toast[type](message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            style: {
                fontSize: '16px',
                padding: '16px',
                minWidth: '300px',
                textAlign: 'center'
            }
        });
    };

    async function handleRegistration(e) {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        // Basic validation
        if (!name || !username || !email || !password) {
            setErrorMessage('All fields are required');
            showToast('Please fill in all required fields');
            setLoading(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email format');
            showToast('Please enter a valid email address');
            setLoading(false);
            return;
        }

        // Password validation
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            showToast('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        const user = { name, username, email, password };

        try {
            const response = await registerAPICall(user);
            showToast('Registration successful! Please login.', 'success');
            navigate('/login');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            setErrorMessage(errorMessage);
            showToast(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-lg border-0">
                    <div className="card-header bg-primary text-white text-center py-4 border-0">
                        <h2 className="fw-bold mb-0">Create Account</h2>
                        <p className="mb-0">Join us today!</p>
                    </div>
                    <div className="card-body p-5">
                        <form onSubmit={handleRegistration}>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Full Name</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <i className="bi bi-person"></i>
                                    </span>
                                    <input
                                        type="text"
                                        name='name'
                                        className="form-control form-control-lg"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">Username</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <i className="bi bi-at"></i>
                                    </span>
                                    <input
                                        type="text"
                                        name='username'
                                        className="form-control form-control-lg"
                                        placeholder="Choose a username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <i className="bi bi-envelope"></i>
                                    </span>
                                    <input
                                        type="email"
                                        name='email'
                                        className="form-control form-control-lg"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">Password</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <i className="bi bi-lock"></i>
                                    </span>
                                    <input
                                        type="text"
                                        name='password'
                                        className="form-control form-control-lg"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-text">
                                    Password must be at least 6 characters long
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    <div>{errorMessage}</div>
                                </div>
                            )}

                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Creating Account...
                                        </span>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </div>

                            <div className="text-center mt-4">
                                <p className="mb-0">Already have an account? <a href="/login" className="text-decoration-none">Sign In</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;