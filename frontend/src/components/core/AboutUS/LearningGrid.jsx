import React, { createFactory } from 'react'
import CTAButton from '../HomePag/CTAButton'
import HighlightText from '../HomePag/HighlightText';


const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];
  

const LearningGrid = () => {

  return (
    <div className='grid mx-auto  w-[300px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12'>
        {
            LearningGridArray.map((card, index)=>{
                return (

                   <div 
                   key={index}
                   className={`${index === 0 && 'lg:col-span-2 lg:h-[290px]'}
                   ${card.order%2==1 ? "bg-richblack-700 h-[290px]" : "bg-richblue-800 h-[290px]"}
                   ${card.order === 3 && "lg:col-start-2"}
           
                   `}    
                   >
                    {       
                    // for order : -1 we want 2 cols and Order :3 blank
                        card.order<0 ? (
                            <div className='xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0'>
                               <div className="text-4xl font-semibold ">
                                {card.heading}
                                <HighlightText text={card.highlightText} />
                                </div>
                                <p className="text-richblack-300 font-medium">
                                {card.description}
                                </p>
                                <div className="w-fit mt-2">
                                <CTAButton active={true} linkto={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                                </div>

                                


                            </div>
                        ):(<div className='p-8 flex flex-col gap-8'>

                            <p className=' className="text-richblack-5 text-lg'>
                                {card.heading}
                            </p>
                            <p className="text-richblack-300 font-medium">
                            {card.description}
                            </p>

                            </div>)
                    }


                    </div>
                )
            })
        }


    </div>
  )
};

export default LearningGrid


