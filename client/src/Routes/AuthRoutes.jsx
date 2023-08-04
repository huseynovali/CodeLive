import { useEffect, useState } from "react";
import { Navigate, Outlet, json } from "react-router";
import { axiosInstance } from "../services/axiosServices";

function AuthRoutes() {
    const [loading, setLoading] = useState(true);

    const [isTrue,setIsTrue] =useState(false) ;
    const token = JSON.parse(localStorage.getItem("token"))
    useEffect(() => {
        console.log(token);
        axiosInstance.post("/user/api/token", {token})
            .then(res => {
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

        return <div>Loading...</div>;
    }


    if (isTrue) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}

export default AuthRoutes;
