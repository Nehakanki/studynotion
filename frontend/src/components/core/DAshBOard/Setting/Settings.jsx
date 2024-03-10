
import React, {useEffect, useState} from 'react'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../IconButton'
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI'


const Settings = () => {

  const {user} =useSelector((state)=>state.profile);
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const [loading , setLoading ] = useState(false)


  const [imageFile, setImageFile]= useState(null);
  const [previewImg, setPreviewImg] = useState(null)

  const handleClick=()=>{
    fileInputRef.current.click();
    console.log(fileInputRef.current)
  }
  const changeFile= (e)=>{
    const file = e.target.files[0];
    console.log(file);
    if(file){
      setImageFile(file);
      setPreviewImg(file);
    }

  }
  const previewFile = (file)=>{
     const reader = new FileReader();
     reader.readAsDataURL(file)
     reader.onloadend = () => {
       setPreviewImg(reader.result)
     }

  }
   const handleFileUpload = ()=>{
    try{
      setLoading(true);
      const formData = new FormData();
      
// make sure to ennter correct name
      formData.append("displayPicture", imageFile);
      
     console.log(formData);
      console.log(formData+ "formData");
      dispatch(updateDisplayPicture(token,formData)).then(()=>{
        setLoading(false);
      })

    }catch(error){
      console.log("Error While updating the Image", error.message);
    }
   }

  useEffect(()=>{
    if(imageFile){
      previewFile(imageFile)
    }
  },[imageFile])

  return (
    // border Line
    
    <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5'>
      <div className='flex items-center gap-x-4' >
        <img  src={previewImg || user?.image} alt={`profile-${user?.firstName} `}
        className='aspect-square w-[78px] rounded-full object-cover'
        
        />
        <div className="space-y-2">
          <p>Change Profile</p>
          <div className="flex flex-row gap-3"  >
          <input
              type='file'
              onChange={changeFile} 
              ref={fileInputRef}
              className='hidden'
              accept='image/png, image/gif, image/jpeg'
            />
            <button
            onClick={handleClick}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            
            >
              Select
            </button>
            <IconButton
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconButton>
            

          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Settings
