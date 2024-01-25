import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const navigate = useNavigate();
    const token = useSelector(state => state?.auth?.user?.token);
    useEffect(() => {
        if(!token){
            navigate('/');
        }
    }, [token])
  return children;
}

export default PrivateRoute