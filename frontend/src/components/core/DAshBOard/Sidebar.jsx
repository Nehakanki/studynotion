import React from 'react'
import { sidebarLinks } from '../HomePag/data/dashboardLinks';
import { useSelector } from 'react-redux';
import SidebarLinks from './SidebarLinks';

const Sidebar = () => {
  const {loading:authLoading} = useSelector((state)=>state.auth);
  const {loading:profileLoading} = useSelector((state)=>state.profile);
  if(authLoading || profileLoading){
    <div className='flex h-[calc(100vh - 3.5rem)]  min-w-[220px] items-center justify-center border-r-[1px] border-r-richblack-700 bg-richblack-800' >
       <div className="spinner"></div>
    </div>
  }
  return (
    <div>
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link)=>{
            if(link.type && user?.accountType !== link.type ) return null;
            <SidebarLinks/>

          })
          
          
          }


        </div>
      </div>


    </div>
  )
}

export default Sidebar