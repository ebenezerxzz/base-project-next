'use client'

import { api } from "@/services/api"
import { useContext } from "react";
import { createContext, ReactNode, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from "next/navigation";
//Must create hook only for type imports
import { SignUpService } from "@/services/signUp";
import { SignInService } from "@/services/signIn";
import { array } from "zod/v4";
import { getMaxAge } from "next/dist/server/image-optimizer";

type User = {
    username: string;
    token: string;
}
type signUpdata = {
    username: string;
    email: string;
    phone: string;
    password: string;
}
type signInData = {
    email: string;
    password: string;
}
type typeContext = {
    isAuthenticated: boolean;
    user: User | null;
    signUp: (data: signUpdata) => Promise<void>;
    signIn: (dat: signInData) => Promise<void>;
    error: string | null;
    loading: boolean;
}
type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<typeContext>({} as typeContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const isAuthenticated = !!parseCookies();

    async function signIn(data: signInData) {
        setLoading(true);
        setError(null);
        try{
            //quando desestruturado com { datauser } retorna undefined
            //no console
            const { token, user } = await SignInService(data);
            if(token && user){
                setUser(user);
                setCookie(undefined, 'auth.token', token, { getMaxAge: 60 * 1000 });
                return router.push('/dashboard');
            }
        }
        //Experimental err;
        catch(err: any) {
            setLoading(false);
            setError(err.message);
        }
    }
    
    const signUp = async(data: signUpdata) => {
        try{
            const { user } = await SignUpService(data);
            if(user) { return router.push('/');}
        }
        catch(error) {
            console.log(error);
        }
    }
    
    return(
        <AuthContext.Provider value={{
            signIn, signUp, user, isAuthenticated, error, loading
        }}>
            {children}
        </AuthContext.Provider>
    )

}

const useAuthCtx = () => {
    const context = useContext(AuthContext);
    return context;
}

export { useAuthCtx }