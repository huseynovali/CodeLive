import React, { useState } from 'react'
import "./MenuBar.css"
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu, AiOutlineYoutube,AiOutlineUser } from 'react-icons/ai';
import { LiaUsersSolid } from 'react-icons/lia';
import { BiCodeAlt } from 'react-icons/bi';
import { CiStreamOn } from 'react-icons/ci';
import { motion, useDragControls } from 'framer-motion';

function MenuBar() {
  const [open, setOpen] = useState(false)
  const controls = useDragControls()

  function startDrag(event) {
    controls.start(event)
  }

  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <>  <div onPointerDown={startDrag} >salam</div>
      <motion.div drag="x" dragControls={controls} />

      <div className={`sidemenu__section fixed  p-3   text-2xl right-10 top-[40%] z-10 select-none ${!open ? 'rounded-ss-xl rounded-ee-xl' : "rounded-3xl"}`}>


        <motion.ul className={`flex flex-col gap-y-5 text-white  ${!open ? 'h-[50px] overflow-hidden select-none' : ""} `}
          initial={false}
          animate={{
            height: open ? '' : '50px',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
        >

          <motion.li className='hover:bg-blue-700 p-3 rounded-full' onClick={toggleMenu} ><AiOutlineMenu /></motion.li>
          <Link>
            <motion.li className='hover:bg-blue-700 p-3 rounded-full'><AiOutlineHome /></motion.li>
          </Link>
          <Link>
            <motion.li className='hover:bg-blue-700 p-3 rounded-full'><AiOutlineYoutube /></motion.li>
          </Link>
          <Link>
            <motion.li className='hover:bg-blue-700 p-3 rounded-full'><LiaUsersSolid /></motion.li>
          </Link>
          <Link>
            <motion.li className='hover:bg-blue-700 p-3 rounded-full'><BiCodeAlt /></motion.li>
          </Link>
          <Link>
            <motion.li className='hover:bg-blue-700 p-3 rounded-full'><CiStreamOn /></motion.li>
          </Link>
          <Link>
            <motion.li className='hover:bg-blue-700 p-3 rounded-full'><AiOutlineUser /></motion.li>
          </Link>
          
        </motion.ul>




      </div></>

  )
}

export default MenuBar