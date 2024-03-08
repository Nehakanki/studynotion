import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from './IconButton';
import { RiEditBoxLine } from "react-icons/ri"
const Myprofile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div>
      <h1>My Profile</h1>

      {/* Section 1 */}
      <div>
        <div>
          <img
            src={`${user?.image}`}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div>
            <p>{user?.firstName + " " + user?.lastName}</p>
            <p>{user?.email}</p>
          </div>
        </div>
      <IconButton
      text ="Edit"
      onclick={()=>{
        navigate('/dashboard/settings')
      }}
      
      >
       <RiEditBoxLine /> 
       {/* passing this edit icon as a children of the IconButton */}

      </IconButton>
        

      </div>
    </div>
  );
};

export default Myprofile;
