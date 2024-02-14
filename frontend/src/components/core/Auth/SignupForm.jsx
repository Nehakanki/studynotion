import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { sendOTP } from "../../../services/operations/authApi";
import { setSignupData } from "../../../slices/authSlice";
// import { ACCOUNT_TYPE } from "../../../utils/constanst";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"


const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const {
    firstName,
    lastName,
    email,
    confirmPassword,
    password,
    contactNumber,
  } = formData;

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(formData);

  const sumbitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
    };

    // To be used after otp verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOTP(email,navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  //  setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  return (
    <div className="text-richblack-25 font-calibari rounded-lg ">
      {/* selcting the Account type */}

      <div className="flex gap-3 mt-2 p-4 rounded-lg ">
        <b className="px-4">Choose Account Type:</b>
        <div
          onClick={() => handleAccountTypeChange("Student")}
          className={`cursor-pointer ${
            accountType === "Student"
              ? "bg-yellow-50 rounded-lg px-2  text-richblack-800"
              : ""
          }`}
        >
          {accountType === "Student" ? <span>Student</span> : "Student"}
        </div>
        <div
          onClick={() => handleAccountTypeChange("Instructor")}
          className={`cursor-pointer ${
            accountType === "Instructor"
              ? "bg-yellow-50 rounded-lg px-2 text-richblack-800"
              : ""
          }`}
        >
          {accountType === "Instructor" ? (
            <span>Instructor</span>
          ) : (
            "Instructor"
          )}
        </div>
      </div>

      <form onSubmit={sumbitHandler} className="flex w-full flex-col gap-y-4">
        {/* main form */}
        <div>
          {/* firstname And LastName */}
          <div className="flex gap-5 ">
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-25">
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
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-25"
              />
            </label>
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-25">
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
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-25"
              />
            </label>
          </div>

          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-25">
              Email<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={changeHandler}
              placeholder="Email Address"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-25"
            />
          </label>

          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-25">
              Contact No.<sup className="text-">*</sup>
            </p>
            <input
              required
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
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>

                {/* Password */}
          <div className="flex gap-x-4">
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-25">
                Create Password <sup className="text-pink-200">*</sup>
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
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-25"
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
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-25">
                Confirm Password <sub className="text-pink-200">*</sub>
              </p>
              <input
                required
                // hiden or shown
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={changeHandler}
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-25"
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
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="text-center  w-[35%]  mt-2 text-richblack-800  font-calibari bg-yellow-50 text-[13px] px-5 py-2 rounded-md font-bold"
            >
              SignUp
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
