import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authApi";



const UpdatePassword = () => {
  const dispatch = useDispatch();
const location = useLocation();

const { loading } = useSelector((state) => state.auth);
const [formData, setFormData] = useState({
  password: "",
  confirmPassword: "",
});
const handleOnChange = (e) => {

  setFormData((pre) => ({
    ...pre,
    [e.target.name]: e.target.value,
  }));
};
const {password, confirmPassword}= formData;



//  on submitting the form it will call the reset password function
const SubmitHandler = (e) => {
  e.preventDefault();
  const token = location.pathname.split("/").at(-1);
  console.log(password,confirmPassword);
  dispatch(resetPassword(password, confirmPassword, token));
};
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="text-richblack-5 flex flex-col">
          <p>Choose New Password</p>
          <div>Almost done. Enter your new password and youre all set.</div>
          <form onSubmit={SubmitHandler}>
            <label>
              <p>
                password<sub>*</sub>
              </p>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="New Password"
              />
            </label>
            <label>
              <p>
                confirmPassword<sub>*</sub>
              </p>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
              />
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
