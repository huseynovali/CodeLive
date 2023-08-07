import React from 'react'
import "./ProfileComponets.css"
import { motion } from "framer-motion"
import { Outlet } from 'react-router'
function ProfileMainContent() {
    return (
        <motion.div
            className="profile__main__content z-20 p-5 overflow-y-auto pb-16 md:pb-5"
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
        >

         

           <Outlet/>

        </motion.div>
    )
}

export default ProfileMainContent