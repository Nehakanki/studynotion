import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast'

const initialState ={
    // If there is (localStorage.getItem("cart") evaluates to true), it returns the parsed JavaScript object. Otherwise, if there's no value stored under the key "cart" (or if it's null), it returns an empty array [].

    cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [], //array of courses in the cart
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

const cartSlice = createSlice({
    name : "cart",
    initialState: initialState,
    reducers:{
        addToCart: (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)
      
            if (index >= 0) {
              // If the course is already in the cart, do not modify the quantity
              toast.error("Course already in cart")
              return
            }
            // If the course is not in the cart, add it to the cart
            state.cart.push(course)
            // Update the total quantity and price
            state.totalItems++
            state.total += course.price
            // Update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            // show toast
            toast.success("Course added to cart")
          },
          removeFromCart: (state, action) => {
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)
      
            if (index >= 0) {
              // If the course is found in the cart, remove it
              state.totalItems--
              state.total -= state.cart[index].price
              state.cart.splice(index, 1)
              // Update to localstorage
              localStorage.setItem("cart", JSON.stringify(state.cart))
              localStorage.setItem("total", JSON.stringify(state.total))
              localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
              // show toast
              toast.success("Course removed from cart")
            }
          },
        //   clear the cart 
          resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // Update LocalStorage 
            localStorage.removeItem("totalItems")
            localStorage.removeItem("total")
            localStorage.removeItem("cart")
           
            
          },
    }
})


export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default  cartSlice.reducer;