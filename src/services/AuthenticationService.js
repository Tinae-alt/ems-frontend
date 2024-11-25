import axios from "axios";

class AuthenticationService {

    registerSuccessfulLogin(token,email){
        console.log("token inside registerSuccessfulLogin",token + email);
        if (token) {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('email', email);
            return true;
        } else {
            delete axios.defaults.headers.common['Authorization'];
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('email');
            return false;
        }

    }
 
    userLogout = () => {
        // Clear session data
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        // Redirect to the login page or a suitable landing page
        window.location.href = '/';
    };
}

export default new AuthenticationService ()