import React from "react";
import {Navigate} from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const AdminRoute = ({children}) => {
    const {user} = useAuthStore();

    if(!user){
        return <Navigate to="/login" replace/>
    } else if (!user.isAdmin){       
        return <Navigate to="/" replace/>
    }
    return children;
}

export default AdminRoute;