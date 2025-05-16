import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const PrivateRoutes = ({children}) => {
    const {user} = useAuthStore();
    const location = useLocation();

    if(!user){
        return <Navigate to="/login" state={{from: location}} replace/>
    } else {
        console.log(user);      
        return children;
    }
}

export default PrivateRoutes;