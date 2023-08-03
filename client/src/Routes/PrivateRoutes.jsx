import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

function PrivateRoutes() {
    const isTrue = false
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])


    if (loading) {
        return <h1>Loading ...</h1>
    }
    if (error) {
        return <h1>Error ! </h1>
    }
    if (isTrue) {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
}

export default PrivateRoutes;