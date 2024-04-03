import axios from "axios";

const API = (token) => axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {Authorization: token}
});

let url = process.env.REACT_APP_SERVER_URL;

export const registerUser = async (body) => {
    try {
        return await axios.post(`${url}/auth/register`, body);
    }
    catch (error){
        console.log("some error in registering user");
    }
};

export const loginUser = async (body) => {
    try {
        return await axios.post(`${url}/auth/login`, body);
    }
    catch(error) {
        console.log(error);
    }
};

export const validUser = async () => {
    try {
        const token = localStorage.getItem('userToken');
        const { data } = await API(token).get(`/auth/valid`, {
            headers: {Authorization: token}
        });
        return data;
    }
    catch(error) {
        console.log(error);
    }
};

export const searchUsers = async (id) => {
    try {
        const token = localStorage.getItem('userToken');
        return await API(token).get(`/api/users?search=${id}`);
    } 
    catch(error) {
        console.log(error);
    }
};

export const updateUser = async (id, body) => {
    try {
        console.log(body);
        const token = localStorage.getItem('userToken');
        const { data } = await API(token).patch(`/api/users/update/${id}`, body);
        return data;
    }
    catch(error) {
        console.log(error);
    }
};

export const checkValid = async () => {
    const data = await validUser();
    if(!data?.user){
        window.location.href = '/login';
    }
    else{
        window.location.href = 'chats';
    }
};