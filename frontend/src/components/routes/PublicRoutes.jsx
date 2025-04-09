import React from "react";
import {Navigate, useLocation} from "react-router-dom"
import useAuthStore from "../../store/useAuthStore";

export default function PublicRoutes ({children}){
    const {user} = useAuthStore();
    const location = useLocation();

    if(user) {
        // console.log(from);       
        const from = location.state?.from?.pathname || "/";
        return <Navigate to={from} replace/>;
    }

    return children;
};