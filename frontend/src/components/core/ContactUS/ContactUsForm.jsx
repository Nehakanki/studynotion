import React,{useState, useEffect} from 'react'
import { useForm } from "react-hook-form"
import CountryCode from '../../core/HomePag/data/CountryCode.json'
import { apiConnector } from '../../../services/apiconnector'
import { contactusEndpoint } from '../../../services/apis'

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
      } = useForm();

      useEffect(() => {
        if (isSubmitSuccessful) {
          reset({
            email: "",
            firstname: "",
            lastname: "",
            message: "",
            phoneNo: "",
          })
        }
      }, [reset, isSubmitSuccessful])

      const onSubmitHandler=async(data)=>{
        console.log(data);
          try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      // console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }



    
  return (
    <div>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* firstname */}
            <div className="flex flex-col gap-2 lg:w-[40%]" >
             <label htmlFor='firstName' className='text-[18px] text-richblack-25'>FirstName : </label>
                <input
                type='text'
                name="firstname"
                id='firstname'
                placeholder='First Name'
                className='p-0.5 bg-richblack-25 rounded-lg text-richblack-900 pl-4'
                {...register('firstname',{required:true})}

                
                />

                {errors.firstname && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your name.
                </span>)}
            </div>

            {/* LastName */}
                <div className='flex flex-col gap-2 lg:w-[40%]'>
                    <label htmlFor='LastName' className='text-[18px] text-richblack-50'> Last Name :</label>
                    <input
                    type='text'
                    name='lastname'
                    id='lastname'
                    placeholder='Last Name'
                    className='p-0.5 bg-richblack-25 rounded-lg text-richblack-900 pl-4'
                    {
                        ...register('lastname',{required:true})
                    }
                    />
                </div>          
                
            </div>
            {/* email */}
            <div className='flex flex-col gap-2 lg:w-[40%] mt-2'>
                <label htmlFor='Email' className='text-[18px]  text-richblack-50'>Email :</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email Address'
                    className='p-0.5 bg-richblack-25 rounded-lg text-richblack-900 pl-4'
                    {
                        ...register('email',{required:true})
                    }
                    />
                
            </div>

            {/* Phone Number */}
            <div className='flex gap-5 mt-4'>
            <label htmlFor="phonenumber" className="text-[18px] text-richblack-50">
                Phone No.
             </label>
             {/* code and 10 digit no. */}
                        
             <div className="flex w-[68px] flex-col gap-2">
                <select
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Enter first name"
                    className='p-0.5  bg-richblack-25 rounded-lg text-richblack-900 pl-4'
                    {...register("countrycode", { required: true })}
                    >
                    {CountryCode.map((ele, i) => {
                        return (
                        <option key={i} value={ele.code}>
                            {ele.code} -{ele.country}
                        </option>
                        )
                    })}
                </select>
            </div>
            <div className='flex w-[40%] flex-col gap-2 '>
                    <input
                    type="tel"
                    name="phonenumber"
                    id="phonenumber"
                    placeholder="12345 67890"
                    className="p-0.5 bg-richblack-25 rounded-lg text-richblack-900 pl-4"
                 
                    {...register("phoneNo", {
                        required: {
                        value: true,
                        message: "Please enter your Phone Number.",
                        },
                        maxLength: { value: 12, message: "Invalid Phone No" },
                        minLength: { value: 10, message: "Invalid Phone No" },
                       
                    })}
                    />
                    {errors.phoneNo && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.phoneNo.message}
                        </span>
                        )}
                </div>

       
         </div>
         <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="message" className=" text-[18px] text-richblack-50">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="25"
          rows="5"
          placeholder="Enter your message here"
          className= 'p-0.5 bg-richblack-25 rounded-lg text-richblack-900 pl-4'
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>


        </form>

    </div>
  )
}

export default ContactUsForm











