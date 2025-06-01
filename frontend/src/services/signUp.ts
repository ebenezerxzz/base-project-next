'use server'
import { api } from "@/services/api";

type signUpRequestdata = {
    username: string;
    email: string;
    phone: string;
    password: string;
}

export const SignUpService = async(data: signUpRequestdata ) => {
    try{
        const response = await api.post('/registerUser', data);
        if(response.status === 409) console.log(`User with email ${data.email} already exists`); 
            // throw new Error(`User with email ${data.email} already exists`);
        return response.data; 
    }
    catch(error) {
        console.log(error);
    }
}