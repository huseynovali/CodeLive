import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { axiosInstance } from "../services/axiosServices";
import { getCryptLocalSrtorage } from "../services/localStorageCrypt";
import Loading from "../Pages/Loading/Loading";

function PrivateRoutes() {
    const [loading, setLoading] = useState(true);

    const [isTrue, setIsTrue] = useState(false);
    const token = getCryptLocalSrtorage("token")

    useEffect(() => {
        console.log(token);
        axiosInstance.post("/user/api/token", { token })
            .then(res => {
                if (res.data == true) {
                    setTimeout(() => {
                        setIsTrue(true);
                        setLoading(false)
                    }, 500)


                }
            })
            .catch(err => {
                setIsTrue(false);
                setLoading(false)

            })
    }, [])

    if (loading) {
        return <Loading />
    }

    if (isTrue) {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
}

export default PrivateRoutes;