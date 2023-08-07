import React, { useEffect, useState } from 'react'

import { motion } from "framer-motion"
import "./Profile.css"
import Sidebar from '../../components/profileComponents/Sidebar'
import ProfileMainContent from '../../components/profileComponents/ProfileMainContent'
import { axiosInstance } from '../../services/axiosServices'
import { useQuery } from 'react-query'
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt'
import { useSelector, useDispatch } from 'react-redux'
import { addUserData } from '../../Store/reducers/userSlice'
import { useFetcher } from 'react-router-dom'
function Profile() {
  const userid = getCryptLocalSrtorage("userid")
  const token = getCryptLocalSrtorage("token")
  const dispatch = useDispatch()


  const { isLoading, error, data } = useQuery('userData', () =>
    axiosInstance.get(`/user/${userid}/${token}`), { refetchOnWindowFocus: false, }
  )
  console.log(data);
  useEffect(() => {
    dispatch(addUserData(data?.data))

  }, [data])



  return (
    <motion.div
      className='profile__page flex relative h-screen overflow-y-scroll'
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.9 }}
    >

      <div className=" absolute z-10 w-full h-full">
        <div className="decoration__image absolute  w-full h-screen overflow-hidden -z-10">
          <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" >
            <path fill="#4144EB" d="M49.9,-67.1C64.8,-57.8,77.2,-43.4,82.8,-26.8C88.3,-10.1,87.1,8.9,79.1,23.2C71,37.5,56.1,47.1,41.8,58.9C27.5,70.6,13.7,84.5,-1.4,86.4C-16.5,88.3,-33,78.3,-42,64.8C-50.9,51.3,-52.3,34.4,-55.1,19.4C-57.9,4.4,-62.2,-8.6,-58.3,-18.4C-54.4,-28.2,-42.3,-34.9,-31.2,-45.4C-20.1,-56,-10,-70.4,3.7,-75.5C17.5,-80.7,34.9,-76.4,49.9,-67.1Z" transform="translate(50 100)" />
          </svg>
        </div>
        <div className="decoration__image absolute  w-full h-screen overflow-hidden -z-10">
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4144EB" d="M49.6,-58.9C64,-46.9,75.3,-31.1,75.3,-15.6C75.3,-0.1,64,15.2,53.2,27.8C42.4,40.4,32.2,50.5,19.5,56.3C6.8,62.1,-8.5,63.6,-24.5,60.7C-40.5,57.7,-57.3,50.2,-64,37.5C-70.7,24.8,-67.3,6.7,-58.2,-4.2C-49.1,-15.2,-34.2,-19.1,-23.5,-31.7C-12.8,-44.4,-6.4,-65.9,5.6,-72.5C17.6,-79.1,35.1,-70.9,49.6,-58.9Z" transform="translate(350 200)" />
          </svg>
        </div>
        <div className="decoration__image absolute  w-full h-screen overflow-hidden -z-10">
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4144EB" d="M63.4,-35.4C64,-18.6,33.9,-6.6,15.3,2.5C-3.3,11.7,-10.5,18.1,-22.5,13.5C-34.5,8.9,-51.2,-6.6,-48.3,-26.5C-45.3,-46.4,-22.6,-70.8,4.4,-72.2C31.4,-73.6,62.7,-52.1,63.4,-35.4Z" transform="translate(340 50)" />
          </svg>
        </div>
      </div>
      <Sidebar />
      <ProfileMainContent />
    </motion.div>
  )
}

export default Profile