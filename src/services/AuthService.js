import axios from "axios";


const BASE_URL = "http://localhost:8080/api/auth";

export const loginAPICall = (usernameOrEmail, password) => {
    return axios.post(BASE_URL + "/login", {
        usernameOrEmail,
        password
    });
}

export const registerAPICall = (user) => {
    return axios.post(BASE_URL + "/register", user);
}

export const getToken = () => {
    return sessionStorage.getItem('token');
}

export const saveLoggedInUser = (username) => {
    localStorage.setItem('authenticatedUser', username);
}



export const isUserLoggedIn = () => {
    const token = sessionStorage.getItem('token');
    // Check if token exists and is not expired
    if (token) {
        return true;
    }
    return false;
}

export const logout = () => {
    const token = getToken();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    // Clear all localStorage items

    if (token) {
        return axios.post(BASE_URL + "/logout", {}, {
            headers: {
                'Authorization': token
            }
        }).catch(error => {
            console.error('Logout error:', error);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('email');
        });
    }

}

// Add axios interceptor for JWT token
axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle unauthorized responses
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear localStorage and redirect to login
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

