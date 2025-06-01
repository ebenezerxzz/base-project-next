import axios from "axios";

export const api = axios.create({
        baseURL: "http://localhost:3333",
        headers: {'Content-Type': 'application/json'},
})

// api.interceptors.response.use(
//         response => response, 
//                 error => {
//                         const status = error.response?.status;
//                         const messageError = error.response?.data?.MessageError;

//                         if (status === 401) return messageError;
//                 }
// )