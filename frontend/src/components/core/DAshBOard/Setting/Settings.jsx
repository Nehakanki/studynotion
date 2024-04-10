import React from 'react'
import ChangeProfile from './ChangeProfile'
import EditProfile from './EditProfile'
import DeleteProfile from './DeleteProfile'

const Settings = () => {
  return (
    <div className = 'font-calibari'>

    <div><ChangeProfile/></div>
    <div><EditProfile/></div>
    <div><DeleteProfile/></div>
    </div>
  
  )
}

export default Settings