import React from 'react'
import Logo1 from '../../../assests/logos/code.svg'
import Logo2 from '../../../assests/logos/degree.svg'
import Logo3 from '../../../assests/logos/diamond.svg'
import Logo4 from '../../../assests/logos/graduation.svg'
import timelineImage from '../../../assests/banner/Frame 22.png'



const timeline =[
  {
    Logo:Logo1,
    heading:"Solve the problem",
    Description:"Code your way to a solution",
  },
  {
    Logo:Logo2,
    heading:"Responsibility",
    Description:"Student always be our first priority",
  },
  {
    Logo:Logo3,
    heading:"Flexibility",
    Description:"The ability to switch is important skill",
  },
  {
    Logo:Logo4,
    heading:"Leadership",
    Description:"Fully committed to the success company",
  },


]
const TimelineSection = () => {
  return (
    <div className='sm:flex sm:flex-row font-calibari'>
      {/* cureent chnage */}
      <div className='sm:flex sm:flex-row flex flex-col'>
        <div className='w-[100%] flex flex-col sm:gap-5 gap-3'>
          {timeline.map((element, index) => (
            <div className='sm:flex sm:flex-row flex font-calibri sm:pl-8 pl-2' key={index}>
              <div className='w-[38px] h-[40px] bg-white flex items-center pl-18 rounded-s-full'>
                <img src={element.Logo} alt="logo" loading='lazy' className='pl-1'/>
              </div>
             
              <div className='sm:w-[100%] sm:pl-4 pl-2'>
                <h2 className='font-calibri font-semibold text-[18px]'>
                  {element.heading}
                </h2>
                <p className='text-base font-calibri'>{element.Description}</p>
              </div>
            </div>
          ))}
        </div> 
        {/* all logos */}

        <div className='relative shadow-blue-200 w-[85%] pl-10'>
          <img src={timelineImage} alt="image" className='shadow-white object-cover h-fit'/>
          <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-10 left-[50%] translate-x-[-40%] font-calibri w-[70%] translate-y-[-30%] rounded-lg'>
            <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-4'>
              <p className='text-3xl font-bold'>10</p>
              <p className="text-caribbeangreen-300 text-sm">Year of Experience</p>
            </div>

            <div className='flex gap-5 items-center px-7'>
              <p className='text-3xl font-bold'>250</p>
              <p className="text-caribbeangreen-300 text-sm">Type of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection
