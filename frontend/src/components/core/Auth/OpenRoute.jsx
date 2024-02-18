import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const OpenRoute = ({child}) => {
    const {token} = useSelector((state)=>state.auth);
  if(token === null)
    return child
    else{
        return <Navigate  to='/dashboard/my-profile'/>
    }
}

export default OpenRoute