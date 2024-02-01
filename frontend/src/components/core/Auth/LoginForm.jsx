import React from 'react'
import { useState } from 'react'
import { UseDispatch, useDispatch } from 'react-redux'
import {Link, useAsyncError, useNavigate} from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import {login} from '../../../../src/services/operations/authApi'

const LoginForm = () => {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const [formData, setFormData] = useState({
        email: "",
        password:""
     })

     const [showPassword, setPassword] = useState(false)
     const {email,password}=formData

     const handleOnChange =(e)=>{
        setFormData((preData)=>({
            ...preData,
            [e.target.name]:e.target.value
        }))
     }
     const handleOnSubmit = (e)=>{
        e.prevantDefault()
        dispatch(login(email, password, navigate))
     }

  return (
   <form
   onSubmit={handleOnSubmit}
   className='mt-6 flex w-full flex-col gap-y-4'>
    <label className='w-full' >
    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 '>
        Email Adress <sub className='text-pink-200'>*</sub>
    </p>
    <input
        required
        type="text"
        name="email"
        value={email}
        onChange={handleOnChange}
        placeholder='Enter Email address'
        style={{
            boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)"
        }}
        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
    />

    </label>
    <label className='relative'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
            Password <sub className='text-pink-200'>*</sub>
        </p>
        <input
        required
        // hiden or shown
        type={showPassword ? "text" :"password"} 
        name="password"
        onChange={handleOnChange}
        placeholder='Enter Password'
        style={{
            boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)"
        }}
        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
        />
        <span
        onClick={()=>setPassword((prev)=>(!prev))}
        className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
            {
                showPassword ? (<FaRegEye fontSize={24} fill='#AFB2BE' />):(<FaRegEyeSlash fontSize={24} fill='#AFB2BE'/>)
            }

        </span>
        {/* forgot password */}
        <Link to='/forgot-password'>
            <p className='mt-1 ml-auto max-w-max text-xs text-blue-100'>
                Forgot Password
            </p>
        </Link>


    </label>
    <button
        type="submit"   
        className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'
        >
            Sign In

    </button>


   </form>
  )
}

export default LoginForm