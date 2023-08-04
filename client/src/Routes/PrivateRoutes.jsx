import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { axiosInstance } from "../services/axiosServices";

function PrivateRoutes() {
    const [loading, setLoading] = useState(true);

    const [isTrue, setIsTrue] = useState(false);
    const token = JSON.parse(localStorage.getItem("token"))
    useEffect(() => {
        console.log(token);
        axiosInstance.post("/user/api/token", { token })
            .then(res => {
                if (res.data == true) {
                    setIsTrue(true);
                    setLoading(false)

                }
            })
            .catch(err => {
                setIsTrue(false);
                setLoading(false)

            })
    }, [])

    if (loading) {
        return <h1>Loading ...</h1>
    }

    if (isTrue) {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
}

export default PrivateRoutes;