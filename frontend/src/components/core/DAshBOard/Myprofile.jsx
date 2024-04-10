import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "./IconButton";
import { RiEditBoxLine } from "react-icons/ri";
import { formattedDate } from "../../../utils/dateFormatter";
const Myprofile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="">
    <h1 className="mb-10 text-3xl font-calibari font-medium text-richblack-5">
    My Profile
  </h1>
  <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-12">
    <div className="flex items-center font-calibari gap-x-4">
      <img
        src={user?.image}
        alt={`profile-${user?.firstName}`}
        className="aspect-square w-[78px] rounded-full object-cover"
      />
      <div className="space-y-1 font-calibari">
        <p className="text-lg font-semibold text-richblack-5">
          {user?.firstName + " " + user?.lastName}
        </p>
        <p className="text-sm text-richblack-300">{user?.email}</p>
      </div>
    </div>
    <IconButton
      text="Edit"
      onclick={() => {
        navigate("/dashboard/settings")
      }}
    >
      <RiEditBoxLine />
    </IconButton>
  </div>
  <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
    <div className="flex w-full items-center justify-between">
      <p className="text-lg font-semibold text-richblack-5 font-calibari">About</p>
      <IconButton
        text="Edit"
        onclick={() => {
          navigate("/dashboard/settings")
        }}
      >
        <RiEditBoxLine />
      </IconButton>
    </div>
    <p
      className={`${
        user?.additionalDetails?.about
          ? "text-richblack-5"
          : "text-richblack-400"
      } text-sm font-medium`}
    >
      {user?.additionalDetails?.about ?? "Write Something About Yourself"}
    </p>
  </div>
  <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
    <div className="flex w-full items-center justify-between font-calibari">
      <p className="text-lg font-semibold text-richblack-5 font-calibari">
        Personal Details
      </p>
      <IconButton
        text="Edit"
        onclick={() => {
          navigate("/dashboard/settings")
        }}
      >
        <RiEditBoxLine />
      </IconButton>
    </div>
    <div className="flex px-11 w-[800px] justify-between">
      <div className="flex flex-col gap-y-5">
        <div className="font-calibri">
          <p className="mb-2 text-sm text-richblack-600 font-calibri">First Name</p>
          <p className="text-sm font-medium text-richblack-5 font-calibri">
            {user?.firstName}
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm text-richblack-600 font-calibri">Email</p>
          <p className="text-sm font-medium text-richblack-5 font-calibri">
            {user?.email}
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm text-richblack-600 font-calibri">Gender</p>
          <p className="text-sm font-medium text-richblack-5">
            {user?.additionalDetails?.gender ?? "Add Gender"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-5">
        <div>
          <p className="mb-2 text-sm text-richblack-600 font-calibri">Last Name</p>
          <p className="text-sm font-medium text-richblack-5 font-calibri">
            {user?.lastName}
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm text-richblack-600 font-calibri">Phone Number</p>
          <p className="text-sm font-medium text-richblack-5 font-calibri">
            {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm text-richblack-600 font-calibri">Date Of Birth</p>
          <p className="text-sm font-medium text-richblack-5 font-calibri">
            {formattedDate(user?.additionalDetails?.dateOfBirth) ??
              "Add Date Of Birth"}
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default Myprofile;
