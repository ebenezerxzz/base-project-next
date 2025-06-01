import { api } from "../services/api";

type SignInData = {
    email: string;
    password: string;
}   

export const SignInService = async (data: SignInData) => {
    try{
        const response = await api.post('/loginUser', data);
        if(response.status == 200) return response.data;
        throw new Error('Internal server error.');
    }
    catch(err: any) {    
        if(err.status === 401){
        }
        switch(err.status){
            case(401): {
                throw new Error('Invalid credentials !!');
                break;
            }
            case(409): {
                throw new Error('Not found user');
                break
            }
        }
    }
}  

