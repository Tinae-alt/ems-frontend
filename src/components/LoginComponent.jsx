import { useState } from "react";
import { getToken, loginAPICall, saveLoggedInUser, storeToken } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import UtilsService from "../services/UtilsService";
import AuthenticationService from "../services/AuthenticationService";
import { Spinner } from "./Spinner";
import { toast } from "react-toastify";

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const showToast = (message, type = 'error') => {
        toast[type](message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
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

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const validPassword = UtilsService.validatePasswords(password);

        if (!validEmail) {
            showToast("Invalid email format. Please check your email address.");
            setErrorMessage("Invalid email");
            setLoading(false);
            return;
        }

        if (!validPassword) {
            showToast("Password must have at least 6 characters with at least one uppercase letter, one lowercase letter, one number, and one special character");
            setErrorMessage("Invalid password format");
            setLoading(false);
            return;
        }

        try {
            const response = await loginAPICall(email, password);

            if (response.data && response.data.accessToken) {
                showToast("Login successful! Redirecting to dashboard...", "success");
                setTimeout(() => {
                    AuthenticationService.registerSuccessfulLogin(response.data.accessToken, email);
                    navigate('/dashboard');
                }, 2000);
                setErrorMessage('');
            }
        } catch (error) {
            setPassword("");

            if (error.response) {
                const status = error.response.status;
                const errorDetail = error.response.data.detail ||
                    error.response.data.message ||
                    'Authentication failed';

                switch (status) {
                    case 401:
                        showToast('Invalid email or password. Please check your credentials and try again.');
                        setErrorMessage('Invalid email or password');
                        break;
                    case 403:
                        showToast('Access forbidden. Please contact support if you believe this is an error.');
                        setErrorMessage('Access forbidden');
                        break;
                    default:
                        showToast(`Login failed: ${errorDetail}. Please try again or contact support.`);
                        setErrorMessage(errorDetail);
                }
            } else if (error.request) {
                showToast('Network error. Please check your internet connection and try again.');
                setErrorMessage('Network error. Please try again later.');
            } else {
                showToast('An unexpected error occurred. Please try again or contact support if the problem persists.');
                setErrorMessage('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-lg border-0">
                    <div className="card-header bg-primary text-white text-center py-4 border-0">
                        <h2 className="fw-bold mb-0">Welcome Back</h2>
                        <p className="mb-0">Please sign in to continue</p>
                    </div>
                    <div className="card-body p-5">
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <i className="bi bi-envelope"></i>
                                    </span>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        name='email'
                                        className="form-control form-control-lg"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label fw-bold">Password</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <i className="bi bi-lock"></i>
                                    </span>
                                    <input
                                        type="password"
                                        id="password"
                                        name='password'
                                        className="form-control form-control-lg"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {loading && (
                                <div className="text-center mb-4">
                                    <Spinner />
                                </div>
                            )}

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
                                            Signing In...
                                        </span>
                                    ) : (
                                        'Sign In'
                                    )}
                                </button>
                            </div>

                            <div className="text-center mt-4">
                                <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
                                <p className="mt-3 mb-0">Don't have an account? <a href="/register" className="text-decoration-none">Sign Up</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;