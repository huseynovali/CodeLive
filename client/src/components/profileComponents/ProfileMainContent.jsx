import React from 'react'
import "./ProfileComponets.css"
import { motion } from "framer-motion"
import { Outlet } from 'react-router'
function ProfileMainContent() {
    return (
        <motion.div
            className="profile__main__content z-20"
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
        >

            main-content

           <Outlet/>

        </motion.div>
    )
}

export default ProfileMainContent