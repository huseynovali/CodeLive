import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu, AiOutlineYoutube, AiOutlineUser } from 'react-icons/ai';
import { LiaUsersSolid } from 'react-icons/lia';
import { BiCodeAlt } from 'react-icons/bi';
import { CiStreamOn } from 'react-icons/ci';
import { motion } from 'framer-motion';
import "./MenuBarMobile.css"
function MenuBarMobile() {
  const location = useLocation()

  return (

    <motion.div className={`bottom__menu__section fixed flex  p-1 text-2xl left-0 bottom-0 z-30 select-none w-full   md:hidden`}>
      <motion.ul className={`flex  justify-around text-white w-full  `}
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 14 }}
      >
        <Link to={"/"}>
          <motion.li className={` p-3 rounded-full ${location.pathname == "/" ? ' relative bg-blue-700' : ""} `} transition={{ duration: 1 }} animate={{ bottom: '30px' }}>
            <div className={`li__cover w-[50px] h-[50px] absolute top-[-0.5px] left-[-1px] rounded-full -z-10 bg-white ${location.pathname == "/" ? ' block' : "hidden"}`}></div>
            <AiOutlineHome />
          </motion.li>
        </Link>
        <Link to={"/allvideos"}>
          <motion.li className={` p-3 rounded-full ${location.pathname == "/allvideos" ? ' relative bg-blue-700' : ""} `} animate={{ bottom: '30px' }}>
            <div className={`li__cover w-[50px] h-[50px] absolute top-[-0.5px] left-[-1px] rounded-full -z-10 bg-white ${location.pathname == "/video" ? ' block' : "hidden"}`}></div>
            <AiOutlineYoutube />
          </motion.li>
        </Link>
        <Link to={"/allusers"}>
          <motion.li className={` p-3 rounded-full ${location.pathname == "/allusers" ? ' relative bg-blue-700' : ""} `} animate={{ bottom: '30px' }}>
            <div className={`li__cover w-[50px] h-[50px] absolute top-[-0.5px] left-[-1px] rounded-full -z-10 bg-white ${location.pathname == "/users" ? ' block' : "hidden"}`}></div>
            <LiaUsersSolid />
          </motion.li>
        </Link>
        <Link>
          <motion.li className={` p-3 rounded-full ${location.pathname == "/questions" ? ' relative bg-blue-700' : ""} `} animate={{ bottom: '30px' }}>
            <div className={`li__cover w-[50px] h-[50px] absolute top-[-0.5px] left-[-1px] rounded-full -z-10 bg-white ${location.pathname == "/question" ? ' block' : "hidden"}`}></div>
            <BiCodeAlt />
          </motion.li>
        </Link>
        <Link>
          <motion.li className={` p-3 rounded-full ${location.pathname == "/livestream" ? ' relative bg-blue-700' : ""} `} animate={{ bottom: '30px' }}>
            <div className={`li__cover w-[50px] h-[50px] absolute top-[-0.5px] left-[-1px] rounded-full -z-10 bg-white ${location.pathname == "/livestream" ? ' block' : "hidden"}`}></div>
            <CiStreamOn />
          </motion.li>
        </Link>
        <Link to={"/profile/accound"}>
          <motion.li className={` p-3 rounded-full ${location.pathname.split("/")[1] == "profile" ? ' relative bg-blue-700' : ""} `} animate={{ bottom: '30px' }}>
            <div className={`li__cover w-[50px] h-[50px] absolute top-[-0.5px] left-[-1px] rounded-full -z-10 bg-white ${location.pathname.split("/")[1] == "profile" ? ' block' : "hidden"}`}></div><AiOutlineUser /></motion.li>
        </Link>

      </motion.ul>




    </motion.div>



  )
}

export default MenuBarMobile