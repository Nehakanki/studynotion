import React from 'react'
import { VscAccount, VscDashboard, VscVm, VscAdd, VscMortarBoard, VscHistory } from 'react-icons/vsc';
import {NavLink, matchPath, useLoaction} from 'react-router-dom'


const SidebarLinks = ({link, iconName}) => {
    // error may occour
    const Icon = iconName;
    const location = useLoaction();
    const matchRoute = (route)=>{
        matchPath({path:route}, location.pathname);
    }
  return (
    // for each link of the SideBar
    <div>
        <NavLink 
         to={link.path}
        //  position relative to border overlap on it
         className={`relative px-8 py-2 text-sm font-medium ${
            matchRoute(link.path)
              ? "bg-yellow-800 text-yellow-50"
              : "bg-opacity-0 text-richblack-300"
          } transition-all duration-200`}
        
        
        >
            {/* Left side border yellow border through Span tag */}
            <span
                className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                matchRoute(link.path) ? "opacity-100" : "opacity-0"
                }`}
            ></span>
        {/* the Icons and the Name of the links*/}
            <div className="flex items-center gap-x-2">
                {/* Icon */}
                <Icon className="text-lg" />
                <span>{link.name}</span>
            </div>



        </NavLink>


    </div>
  )
}

export default SidebarLinks