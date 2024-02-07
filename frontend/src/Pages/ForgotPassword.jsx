import React, {useState} from 'react'
import { UseSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'

const ForgotPassword = () => {

  // 2 page are to be shown 
 
  // 1st one: Resend the Email
   // 2nd one: Check Your Email

    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const dispatch = dispatch()
    const { loading } = useSelector((state) => state.auth)
  return (
    <div>
      {
        loading ? <div>Loading ....</div>:
        // show content 
          <div>
              {/* if there is EmailSent then page 2 else page 1 */}
             <h1>
              {
                !emailSent ? "Reset your password" :"Check Your Email"
              }
             </h1>

             <p>
                {
                  !emailSent ?"Have no fear. We’ll email you instructions to reset your passwid. If you dont have access to your email we can try account recovery"  :`We have sent the reset email to ${email}
                  `
                }
             </p>

             <form>
                {
                     !emailSent && (
                      <label>
                        <p>Email Address *</p>
                        <input
                         required
                         type ="email"
                         name ="email"
                         value ={email}
                         onChange={(e)=> setEmail(e.target.value)}
                         placeholder='Enter your Email Address'
      
                        />
                      </label>
                   
                     )
                }

                <button>
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