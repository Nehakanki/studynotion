import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom';
import {getPasswordResetToken} from '../services/operations/authApi'

// Your component code goes here

const ForgotPassword = () => {

  // 2 page are to be shown 
 
  // 1st one: Resend the Email
   // 2nd one: Check Your Email

    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)
    const handleOnSubmit=(e)=>{
      e.preventDefault();
      dispatch(getPasswordResetToken(email, setEmailSent))
     }
    
  return (
    <div>
      {
        loading ? <div>Loading ....</div>:
        // show content 
          <div className='w-11/12 flex flex-col items-center mx-auto max-w-maxContent justify-between  text-richblack-25'>
              {/* if there is EmailSent then page 2 else page 1 */}
             <h1>
              {
                !emailSent ? "Reset your password" :"Check Your Email"
              }
             </h1>

             <p>
                {
                  !emailSent ?"Have no fear. We'll email you instructions to reset your passwid. If you dont have access to your email we can try account recovery"  :`We have sent the reset email to ${email}
                  `
                }
             </p>

             <form onSubmit={handleOnSubmit}>
                {
                     !emailSent && (
                      <label className='w-full'>
                        <p>Email Address *</p>
                        <input
                         required
                         type ="email"
                         name ="email"
                         value ={email}
                         onChange={(e)=> setEmail(e.target.value)}
                         placeholder='Enter your Email Address'
                         className="form-style w-full"
                        />
                      </label>
                   
                     )
                }

                <button 
                type ='submit'
                
                >
                  {
                    emailSent ? "Reset password":"Check your Email"
                  }
                </button>
             </form>

             <div>
                <Link to="/login">
                  <p>Back to login</p>
                </Link>
              </div>
             
          </div>
      }
      
      
      
    </div>

    
  )
}

export default ForgotPassword