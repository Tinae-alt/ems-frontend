import axios from "axios";

//export const BASE_URL = 'http://192.168.118.41:30092';
 export const BASE_URL = 'http://localhost:8089';

export const getUser = (user) => {
    return axios.post(`${BASE_URL}/api/user/auth/login`,user);
};
