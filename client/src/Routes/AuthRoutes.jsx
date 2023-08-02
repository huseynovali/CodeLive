import { useState } from "react";
import { Navigate, Outlet } from "react-router";

function AuthRoutes() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const isTrue = false;



    // Simulate a loading delay for demonstration purposes (you can remove this part)
    setTimeout(() => {
        setLoading(false);
    }, 2000);

    // Simulate an error condition for demonstration purposes (you can remove this part)
    setTimeout(() => {
        setError(true);
    }, 4000);

    if (loading) {
        // If loading is true, you can show a loading spinner or message here.
        return <div>Loading...</div>;
    }

    if (error) {
        // If error is true, you can show an error message or a fallback UI here.
        return <div>Error occurred. Please try again later.</div>;
    }
    if (isTrue) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}

export default AuthRoutes;
