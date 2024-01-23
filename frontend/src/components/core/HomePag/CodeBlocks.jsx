import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({postion, heading, subheading ,ctabn1, ctabn2, codeblock, backgroundGradient, codeColor }) => {
  return (
    <div className={`sm:flex sm:${postion} sm:my-15 sm:justify-between sm:gap-10 flex flex-col mx-auto max-w-maxContent`}>
        {/* Section 1 */}
     
        <div className="sm:w-[50%] flex flex-col sm:gap-8 mx-auto max-w-maxContent gap-3 font-calibari">
            {heading}
            <div className='text-richblack-300 w-[90%] font-bold font-calibari'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabn1.active} linkto={ctabn1.linkto}>
                    <div className='flex gap-2 items-center font-calibari'>
                        {ctabn1.btnText}
                        <FaArrowRight/>

                    </div>
                </CTAButton>

                <CTAButton active={ctabn2.active} linkto={ctabn2.linkto}>
                        {ctabn2.btnText}
                </CTAButton>


            </div>

        </div>

        {/* section 2 */}
        <div className='h-fit flex text-10[px] w-[100%] py-4 lg:w-[500px]'>
            {/* add gradient */}

            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              
            </div>

            <div className= {`w-[90%] flex flex-col gap-2 font-mono font-bold font-mono1 ${codeColor} pr-2 `}>

                <TypeAnimation
                
                sequence={[codeblock, 1600, ""]}
                repeat={Infinity}
                cursor={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                }

                omitDeletionAnimation={true}
                />

            </div>
        </div>


      
    </div>
  )
}

export default CodeBlocks
