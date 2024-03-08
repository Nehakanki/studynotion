import { useState } from "react";
import { sidebarLinks } from "../HomePag/data/dashboardLinks";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authApi";
import SidebarLinks from "./SidebarLinks";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";

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
    <div>
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {/* for each link */}

          {sidebarLinks.map((link) =>
            link.type && user?.accountType !== link.type ? null : (
              <SidebarLinks link={link} key={link.id} iconName={link.icon} />
            )
          )}
        </div>

        {/* Setting and Logout Button */}
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700">
          <SidebarLinks
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />

          {/* button for Logout and onCLick a Modal is shown */}

          {/* here then confirmation Model data is simultaneously */}
          <button
           onClick={() =>
            setConfirmationModal({
              txt1: "Are You Sure ?",
              txt2: "You will be logged Out from your Account",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
            className="text-sm font-medium text-richblack-300 px-6 py-2 "
          >
            {/* CSS make sure */}
            <div className="flex items-center justify-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {Confirmation && <ConfirmationModal setdata={setConfirmationModal} />}
    </div>
  );
};

export default Sidebar;
