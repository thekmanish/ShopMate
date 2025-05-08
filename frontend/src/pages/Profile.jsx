import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Profile = () => {
    const {user} = useAuthStore();
    const navigate = useNavigate();
}

export default Profile;