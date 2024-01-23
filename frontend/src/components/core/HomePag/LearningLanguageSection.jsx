import React from 'react'
import HighlightText from './HighlightText'
import calender from '../../../assests/logos/Calender.jpg'
import CTAButton from './CTAButton'

const LearningLanguageSection = () => {
  return (
    <div>
      <div className='flex flex-col gap-5 font-semibold text-center mt-[120px] font-calibari '>
        <div className='text-4xl font-semibold text-center'>
          <span className='text-richblack-500'>Your Swiss knife for </span>
          <HighlightText text={"Learning any Language"}/>
        </div>
        <div className='text-center text-richblack-600 mx-auto text-base mt-3 font-mono'>
        Using spin making learning multiple Language easy with 20+ languages realistic voice-over,
        progress tracking, custom schedule and more.
        </div>

        <div  className='mx-auto lg:p-10'>
          <img src={calender} alt="" />
        </div>

        <div className='font-calibari w-[30%] mx-auto flex items-center justify-center'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn more
          </CTAButton>
        </div>
      
      </div>

      
    </div>
  )
}

export default LearningLanguageSection
