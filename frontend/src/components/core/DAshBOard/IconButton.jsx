import React from 'react'

const IconButton = ({
    text, 
    children,
    disabled,
    onclick,
    customClasses,
    type,
  
    outline= false,

}) => {
  return (
    <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      > 
      {

        //if any Children , EX--> any icon button then it should be included
        children ? (<>
           <span className = {`${outline && "text-yellow-50"}`}>
            {text}

           </span>
        
        </>):(
            text
        )
      }




      </button>
  )
}

export default IconButton












