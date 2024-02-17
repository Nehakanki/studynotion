import React from 'react'
import ContactUsForm from '../ContactUS/ContactUsForm'

const ContactForm = () => {
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 mx-auto lg:p-14 flex gap-3 flex-col">
        <h1 className="text-4xl leading-10 font-semibold text-yellow-50">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
        </h1>
        <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
        </p>

        <div className="mt-7">
        <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactForm