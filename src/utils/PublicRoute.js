import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
    const navigate = useNavigate();
    const token = useSelector(state =>  state?.auth?.user?.token);
    useEffect(() => {
        if(token){
            navigate('/dashboard');
        }
    }, [token])
  return children;
}

export default PublicRoute