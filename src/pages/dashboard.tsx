'use client'

import { api } from "@/services/api";
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/api.client";
import { GetServerSideProps } from "next";

export default function Dashboard() {
   
    // const router = useRouter();
    // const [ loading, setLoading ] = useState(true);

    // useEffect(() => {
    //     if(!isAuthenticated) return router.push("/");
    //     setLoading(false);
    // }, [isAuthenticated])
        
    // if(loading){
    //     return
    // }
        
    return(
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex justify-center align-center gap-1.5">
                <h1>Dashboard acessada com sucesso por</h1>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    getAPIClient(ctx);
    const { 'auth.token': token } = parseCookies(ctx);
    if (!token) return { redirect: { destination: '/', permanent: false } }
    api.get('/')

    return {
        props: {}
    }
}
