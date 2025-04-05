import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../store/useAuthStore"

const SignUp = () => {
  
  const {user, signedUpUser} = useAuthStore();
  const navigate = useNavigate();
  useEffect (() => {
    if(user) navigate("/")
  }, [])
  return (<h1>This is signup page</h1>)
}

export default SignUp;

