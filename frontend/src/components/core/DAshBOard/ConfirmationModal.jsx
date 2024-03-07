import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({modalData}) => {
  return (
    <div>
      <div>
        {/* heading */}
        <p>
          {modalData?.text1}

        </p>
        {/* SubHeading */}
        <p>
        {modalData?.text2}

        </p>
        {/* 2 buttons one for logout & 2nd for Cancel */}
        <div>
        <IconButton

        onclick={modalData?.btn1Handler}
        text={modalData?.btn1Text}
        
        />

        <button
        onclick={modalData?.btn2Handler}
        text={modalData?.btn2.Text}
        
        >
          {modalData?.btn2Text}
        </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal