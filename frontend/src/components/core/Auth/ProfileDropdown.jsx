import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import {logout} from "../../../services/operations/authApi";

const ProfileDropdown = () => {
  //When the User clicks on the Catalog this drop down menu is shown that indicates alll the categories
  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ref = useRef(null); // initally no refernce is provided
  

  useOnClickOutside(ref, () => setOpen(false));


  if(!user){
    return null;
  }
  return (
    <button
      className="relative"
      onClick={() => {
        setOpen(true); 
        console.log("button clicked " + open);
       
      }}
    
    >
    
      {/* Profile Logo and Dropdown Icon  */}
      <div className="flex items-center gap-1">
        <img
          src={user?.image}
          alt={`${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        {/* Dropdown Icon  */}
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {/* Conditonal Rendering on the basis of the open  */}

      {open && (
        //  inside the dropdown div anytime i can click this will not bubble up
        <div
        
          onClick={(e) => {e.stopPropagation()
          
          console.log("open div")
          }
          }
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={()=>{setOpen(false)}}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));

              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            
            <VscSignOut className="text-lg" />
            Logout

          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropdown;
