import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authApi";
import { sidebarLinks } from "../HomePag/data/dashboardLinks";
import ConfirmationModal from "./ConfirmationModal";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  // for showing the Logout Confirmation Modal
  const [Confirmation, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // show loading if any of the 2 loading is true
  if (authLoading || profileLoading) {
    return (
      <div className="flex h-[calc(100vh - 3.5rem)]  min-w-[220px] items-center justify-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }
  
  return (
    <div className='font-calibari'>
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col font-calibri">
          {/* for each link */}

          {sidebarLinks.map((link) =>
            link.type && user?.accountType !== link.type ? null : (
              <SidebarLinks link={link} key={link.id} iconName={link.icon} />
            )
          )}
        </div>

        {/* Setting and Logout Button */}
        <div className=" mt-4 mb-6 h-[1px] w-10/12 bg-richblack-700 ">
          <SidebarLinks
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
            className='px-8 py-2'
          />

          {/* button for Logout and onCLick a Modal is shown */}

          {/* here then confirmation Model data is simultaneously */}
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
            
      {Confirmation && <ConfirmationModal modalData={Confirmation} />}
    </div>
  );
};

export default Sidebar;
