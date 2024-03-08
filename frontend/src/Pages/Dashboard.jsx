
// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/core/DAshBOard/Sidebar'

// const Dashboard = () => {
//     const {loading:authLoading} = useSelector((state)=>state.auth);
//     const {loading:profileLoading} = useSelector((state)=>state.profile);

//     if(authLoading || profileLoading){
//       return (
//         <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
//             <div className="spinner"></div>
//         </div>
//     );
//     }

//   return (
//     <div className="relative flex min-h-[calc(100vh-3.5rem)]">
//          <Sidebar />

//         <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//             <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//          {/* the layout of a React application to render child routes defined in the routing configuration. */}

//             <Outlet />
//             </div>
//         </div>




//     </div>
//   )
// }

// export default Dashboard




import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/DAshBOard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(10-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard







