import React from 'react'

const ForgotPassword = () => {

  // 2 page are to be shown 
  // 1st one: entertong Email page
  // 2nd one: Resend the Email

    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)
  return (
    <div>ForgotPassword</div>
    
  )
}

export default ForgotPassword