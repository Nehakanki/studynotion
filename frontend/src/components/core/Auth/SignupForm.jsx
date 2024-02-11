import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const SignupForm = () => {
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState("Student");
  const handleAccountTypeChange = (accountType) => {
    setAccountType(accountType);
    console.log(accountType);
  };
  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: null,
    accountType: accountType,
  });

  //   destructure the values
  const { firstName, lastName, email, password, contactNumber } = formData;

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(formData);

  const sumbitHandler = (e) => {
    e.preventDefault();

    // dispatch the Signup
    // dispatch()
  };

  return (
    <div className="text-richblack-25">
      {/* selcting the Account type */}

      <div className="flex gap-3">
        <div
          onClick={() => handleAccountTypeChange("Student")}
          style={{ cursor: "pointer" }}
        >
          {accountType === "Student" ? <b>Student</b> : "Student"}
        </div>
        <div
          onClick={() => handleAccountTypeChange("Instructor")}
          style={{ cursor: "pointer" }}
        >
          {accountType === "Instructor" ? <b>Instructor</b> : "Instructor"}
        </div>
      </div>

      <form onSubmit={sumbitHandler}
      
      className="flex w-full flex-col gap-y-4"
      
      >
        {/* main form */}
        <div>
          {/* firstname And LastName */}
          <div className="flex gap-5">
            <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>

              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={changeHandler}
                placeholder="First Name"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </label>
            <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>

              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={changeHandler}
                placeholder="Last Name"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
    
              />
            </label>
          </div>

          <label>
            <p>
              Email<sup>*</sup>
            </p>
            <input
              required
              className="text-richblack-800"
              type="text"
              name="email"
              value={email}
              onChange={changeHandler}
              placeholder="Email Address"
            />
          </label>

          <label>
            <p>
              Contact No.<sup>*</sup>
            </p>
            <input
              required
              className="text-richblack-800"
              type="tel"
              name="contactNumber"
              value={contactNumber}
              onChange={changeHandler}
              placeholder="contactNumber"
              //   to restrict the non-numberic values
              onKeyDown={(e) => {
                if (!/\d/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              maxLength={10}
            />
          </label>

          <label className="relative">
            <p className="mb-1 text-[0.6rem] leading-[1.375rem] text-richblack-5">
              Password <sub className="text-pink-200">*</sub>
            </p>
            <input
              required
              // hiden or shown
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            <span
              onClick={() => setPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <FaRegEye fontSize={24} fill="#AFB2BE" />
              ) : (
                <FaRegEyeSlash fontSize={24} fill="#AFB2BE" />
              )}
            </span>
          </label>
        
          <label className="relative">
            <p className="mb-1 text-[0.6rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sub className="text-pink-200">*</sub>
            </p>
            <input
              required
              // hiden or shown
              type={showConfirmPassword? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            <span
              onClick={() => setConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[25px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <FaRegEye fontSize={24} fill="#AFB2BE" />
              ) : (
                <FaRegEyeSlash fontSize={24} fill="#AFB2BE" />
              )}
            </span>
          </label>
          <button type="submit">SignUp</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
