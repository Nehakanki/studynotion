import React from "react";
import { useSelector } from "react-redux";
import IconButton from './IconButton';
const Myprofile = () => {
  const { user } = useSelector((state) => state.profile);
  return (
    <div>
      <h1>My Profile</h1>

      {/* Section 1 */}
      <div>
        <div>
          <img
            src={`${user?.image}`}
            alt={`profile-${firstName}`}
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

      </IconButton>
        

      </div>
    </div>
  );
};

export default Myprofile;
