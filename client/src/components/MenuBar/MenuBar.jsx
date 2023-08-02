import React, { useEffect, useRef, useState } from 'react'
import "./MenuBar.css"
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu, AiOutlineYoutube, AiOutlineUser,AiOutlineClose } from 'react-icons/ai';
import { LiaUsersSolid } from 'react-icons/lia';
import { BiCodeAlt } from 'react-icons/bi';
import { CiStreamOn } from 'react-icons/ci';
import { motion } from 'framer-motion';

function MenuBar() {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!open);
  };



  return (
    <>
      <motion.div drag dragConstraints={{ left: 10, right: 10, bottom: 300, top: -300 }} className={`sidemenu__section fixed  p-3 hidden md:block   text-2xl right-10 top-[40%] z-50 select-none ${!open ? 'rounded-ss-xl rounded-ee-xl' : "rounded-3xl"}`}>


        <motion.ul className={`flex flex-col gap-y-5 text-white  ${!open ? 'h-[50px] overflow-hidden select-none' : ""} `}
          initial={false}

          animate={{
            height: open ? '' : '50px',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
        >

          <motion.li className='hover:bg-blue-700 p-3 rounded-full' onClick={toggleMenu} >
            {
              open ?
              <AiOutlineClose/>:
              <AiOutlineMenu />
            }
            
          </motion.li>
          <Link to={"/"}>
            <motion.li className={` p-3 rounded-full ${location.pathname == "/" ? ' bg-blue-700' : ""} `}>
              <AiOutlineHome />
            </motion.li>
          </Link>
          <Link>
            <motion.li className={` p-3 rounded-full ${location.pathname == "/video" ? ' bg-blue-700' : ""} `}>
              <AiOutlineYoutube />
            </motion.li>
          </Link>
          <Link>
            <motion.li className={` p-3 rounded-full ${location.pathname == "/users" ? ' bg-blue-700' : ""} `}>
              <LiaUsersSolid />
            </motion.li>
          </Link>
          <Link>
            <motion.li className={` p-3 rounded-full ${location.pathname == "/questions" ? ' bg-blue-700' : ""} `}>
              <BiCodeAlt />
            </motion.li>
          </Link>
          <Link>
            <motion.li className={` p-3 rounded-full ${location.pathname == "/livestream" ? ' bg-blue-700' : ""} `}>
              <CiStreamOn />
            </motion.li>
          </Link>
          <Link to={"/profile"}>
            <motion.li className={` p-3 rounded-full ${location.pathname == "/profile" ? ' bg-blue-700' : ""} `}>
              <AiOutlineUser />
            </motion.li>
          </Link>

        </motion.ul>




      </motion.div>



    </>

  )
}

export default MenuBar