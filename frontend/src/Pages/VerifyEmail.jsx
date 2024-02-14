import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { sendOTP,signUp  } from '../services/operations/authApi';
import { useNavigate } from "react-router-dom";



const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const {loading, signupData} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        // make sure Signup data is there
        if (!signupData) {
            navigate('/signup');
        }
      
      }, []);

  const  goToSignUpHandler=(e)=>{
    e.preventDefault();
       const{
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
       }= signupData;

       dispatch(signUp( firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,));


  }

  return (
    <div className='flex w-11/12 max-w-maxContent mx-auto items-center justify-center'>
        {
            loading ? (<div>Loading</div>):(

                <div className='font-calibari'>
                     <h1 className="text-richblack-25 font-semibold text-[1.875rem] leading-[2.375rem]">
                        Verify Email
                     </h1>
                     <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                        A verification code has been sent to you. <span className='text-blue-100 text-center'>  Enter the code below </span> 
                    </p>

                    <form onSubmit={goToSignUpHandler}>
                         <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => (
                                <input
                                  {...props}
                                  placeholder="-"
                                  style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                  }}
                                  className="w-[48px] lg:w-[50px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                              )}
                              containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                              }}
                        />
                        <button 
                        
                         type="submit"
                        className='text-center flex gap-2 w-[25%]  mt-4 text-richblack-800  font-calibari bg-yellow-50 text-[13px] px-5 py-2 rounded-md font-bold'
                        
                        >
                        Verify Email
                        </button>

                    </form>
                    <div className=" flex items-center justify-between mt-5">
                        <Link to="/signup">
                        <p className="text-richblack-25 flex items-center gap-x-2">
                            <BiArrowBack /> Back To Signup
                        </p>
                        </Link>
                        <button
                           className="text-center flex gap-2 w-[30%]  mt-2 text-richblack-800  font-calibari bg-yellow-50 text-[13px] px-5 py-2 rounded-md font-bold"
                        
                        onClick={() => dispatch(sendOTP(signupData.email))}
                        >
                        <RxCountdownTimer  className='mt-1'/>
                        Resend it
                        </button>
                    </div>


                </div>
            )
        }

    
   


   


    </div>
  )
}

export default VerifyEmail












