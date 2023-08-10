import React from 'react'
import "./ProfileComponets.css"
import { motion } from "framer-motion"
import { Outlet } from 'react-router'
function ProfileMainContent() {
    return (
        <motion.div
            className="profile__main__content z-10 relative p-5 overflow-y-auto overflow-x-hidden pb-32 md:pb-5 h-[90vh] md:h-[95vh]"
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
        >

         

           <Outlet/>

        </motion.div>
    )
}

export default ProfileMainContent