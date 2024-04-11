import React from 'react'
import {useSelector } from "react-redux"
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const CartIndex = () => {
  const { total,  totalItems } = useSelector((state) => state.cart);






  return (
    <div className='font-calibari'>
  <h1 className="  text-richblack-5 font-medium mb-14 text-3xl ">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className=" font-edu-sa mt-14 text-center text-3xl text-yellow-50">
          Your cart is empty
        </p>
      )}
      
    </div>
  )
}

export default CartIndex; 


