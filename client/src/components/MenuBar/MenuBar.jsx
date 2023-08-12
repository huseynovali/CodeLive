import React, { useEffect, useRef, useState } from 'react'
import "./MenuBar.css"
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu, AiOutlineYoutube, AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import { LiaUsersSolid } from 'react-icons/lia';
import { BiCodeAlt } from 'react-icons/bi';
import { CiStreamOn } from 'react-icons/ci';
import { motion } from 'framer-motion';

function MenuBar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const toggleMenu = (event) => {
    setOpen(!open);
  };
console.log(location.pathname.split("/")[1] == "profile");
  useEffect(() => {
    const closeMenuOnOutsideClick = (event) => {
      if (event.target.classList.contains("close__button__cover")) {
        setOpen(true);
      } else if (event.target.classList.contains("open__button__cover")) {
        setOpen(false);
      } else {
        setOpen(false);
      }
    };
    document.addEventListener("click", closeMenuOnOutsideClick);
    return () => {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  }, []);

  return (
    <>
      <motion.div drag dragConstraints={{ left: 10, right: 10, bottom: 300, top: -300 }} className={`sidemenu__section fixed  p-3 hidden md:block   text-2xl right-10 top-[40%] z-20 select-none ${!open ? 'rounded-ss-xl rounded-ee-xl' : "rounded-3xl"}`}>


        <motion.ul className={`flex flex-col gap-y-5 text-white  ${!open ? 'h-[50px] overflow-hidden select-none' : ""} `}
          initial={false}

          animate={{
            height: open ? '' : '50px',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
        >
          {
            open ?
              <motion.li className='close hover:bg-blue-700 p-3 rounded-full relative' onClick={toggleMenu} >
                <div className="close__button__cover absolute w-full h-full inset-0"></div>
                <AiOutlineClose />
              </motion.li>
              :
              <motion.li className='open hover:bg-blue-700 p-3 rounded-full relative' onClick={toggleMenu} >
                <div className="open__button__cover absolute w-full h-full inset-0"></div>
                <AiOutlineMenu />
              </motion.li>
          }

          <Link to={"/"}>
            <motion.li className={` p-3 rounded-full ${location.pathname == "/" ? ' bg-blue-700' : ""} `}>
              <AiOutlineHome />
            </motion.li>
          </Link>
          <Link to={"/allvideos"}>
            <motion.li className={` p-3 rounded-full ${location.pathname == "/allvideos" ? ' bg-blue-700' : ""} `}>
              <AiOutlineYoutube />
            </motion.li>
          </Link>
          <Link to={"/allusers"}>
            <motion.li className={` p-3 rounded-full ${location.pathname == "/allusers" ? ' bg-blue-700' : ""} `}>
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
          <Link to={"/profile/accound"}>
            <motion.li className={` p-3 rounded-full ${location.pathname.split("/")[1] == "profile" ? ' bg-blue-700' : ""} `}>
              <AiOutlineUser />
            </motion.li>
          </Link>

        </motion.ul>




      </motion.div>



    </>

  )
}

export default MenuBar