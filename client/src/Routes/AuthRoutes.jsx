import { useEffect, useState } from "react";
import { Navigate, Outlet, json } from "react-router";
import { axiosInstance } from "../services/axiosServices";
import { getCryptLocalSrtorage } from "../services/localStorageCrypt";
import Loading from "../Pages/Loading/Loading";

function AuthRoutes() {
    const [loading, setLoading] = useState(true);

    const [isTrue,setIsTrue] =useState(false) ;
    const token = getCryptLocalSrtorage("token") 

    useEffect(() => {
        console.log(token);
        axiosInstance.post("/user/api/token", {token})
            .then(res => {
                console.log(res.data);
                if(res.data == true){
                    setIsTrue(true);
                    setLoading(false)
              
                }
            })
            .catch(err=>{
                setIsTrue(false);
                setLoading(false)
         
            })
    }, [])

    if (loading) {

        return <Loading/>;
    }


    if (isTrue) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}

export default AuthRoutes;
