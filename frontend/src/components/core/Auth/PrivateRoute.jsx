import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({child}) => {
  const {token} = useSelector((state)=>state.auth);
    if(token !== null){
        return child;
    }
    else{
        <Navigate to='login'/>
    }
}

export default PrivateRoute
