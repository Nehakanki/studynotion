import React from 'react'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)
  return (
    <div>ForgotPassword</div>
  )
}

export default ForgotPassword