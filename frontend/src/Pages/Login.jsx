import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImage from '../assests/banner/login/Frame 22.jpg'



const Login = () => {
  return (
    <Template
      tirle ="Welocome Back"
      description1 = "Build skills for today, tomorrow, and beyond."
      description2 = "Education to future-proof your carrer."
      image ={loginImage}
      formType ="login"

    
    />
  )
}

export default Login