import React, { useState } from 'react'
import { motion } from "framer-motion"
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs'
import { BiSolidUserDetail, BiSolidVideos, BiPurchaseTagAlt } from 'react-icons/bi'
import { SlUserFollow, SlUserFollowing } from 'react-icons/sl'
import { MdFavoriteBorder } from 'react-icons/md'
import { RiVideoAddLine, RiQuestionnaireLine } from 'react-icons/RI'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import "./ProfileComponets.css"
import profileImage from "../../img/Unsplash-Avatars_0005s_0017_harps-joseph-tAvpDE7fXgY-unsplash.png"
const variants = {
    open: { width: "250px" },
    closed: { width: "60px" },
}
function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const sellectLink = location.pathname.split("/").pop()
    console.log(sellectLink);
    return (
        <div className='z-30 absolute'>
            <motion.nav
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                transition={{ damping: 500 }}
            >
                <div className='sidebar__content w-full h-[100vh]  relative' >
                    <motion.div onClick={() => setIsOpen(isOpen => !isOpen)} className={`open__close__icon w-full flex items-center  px-3 py-4 text-white rounded-full ${isOpen ? 'justify-end' : 'justify-center'}`} transition={{ duration: 2 }}>
                        {
                            isOpen ? <div className='flex justify-between w-full items-center'>
                                <h1 className='text-xl ml-3'>CodeLive</h1>
                                <BsArrowBarLeft className=' text-2xl' />
                            </div> : <BsArrowBarRight className=' text-2xl h-[28px]' />
                        }


                    </motion.div>

                    <div className="sidebar__main overflow-hidden flex flex-col justify-between ">
                        <div className="sidebar__list overflow-hidden w-full">
                            <ul className='overflow-hidden w-[250px] py-3'>

                                <Link to={"myvideo"}>
                                    <li className={` sidebar__list__item  ${sellectLink == "myvideo" ? "text-blue-300" : "text-white"} hover:text-blue-500 flex items-center text-lg  py-2`}>
                                        <div className="list__icon w-[60px] flex justify-center items-center py-2 ">
                                            <BiSolidVideos className='text-2xl' />
                                        </div>
                                        My Videos
                                    </li>
                                </Link>
                                <Link>
                                    <li className={` sidebar__list__item  ${sellectLink == "followers" ? "text-blue-500" : "text-white"} hover:text-blue-500 flex items-center text-lg  py-2`}>
                                        <div className="list__icon w-[60px] flex justify-center items-center py-2 ">
                                            <SlUserFollow className='text-2xl' />
                                        </div>
                                        Followers
                                    </li>
                                </Link>
                                <Link>
                                    <li className={` sidebar__list__item  ${sellectLink == "following" ? "text-blue-500" : "text-white"} hover:text-blue-500 flex items-center text-lg  py-2`}>
                                        <div className="list__icon w-[60px] flex justify-center items-center py-2 ">
                                            <SlUserFollowing className='text-2xl' />
                                        </div>
                                        Following
                                    </li>
                                </Link>
                                <Link>
                                    <li className={` sidebar__list__item  ${sellectLink == "favorite" ? "text-blue-500" : "text-white"} hover:text-blue-500 flex items-center text-lg  py-2`}>
                                        <div className="list__icon w-[60px] flex justify-center items-center py-2 ">
                                            <MdFavoriteBorder className='text-2xl' />
                                        </div>
                                        Favorite
                                    </li>
                                </Link>
                                <Link>
                                    <li className={` sidebar__list__item  ${sellectLink == "addvideo" ? "text-blue-500" : "text-white"} hover:text-blue-500 flex items-center text-lg  py-2`}>
                                        <div className="list__icon w-[60px] flex justify-center items-center py-2 ">
                                            <RiVideoAddLine className='text-2xl' />
                                        </div>
                                        Add Video
                                    </li>
                                </Link>
                                <Link>
                                    <li className={` sidebar__list__item  ${sellectLink == "addquestion" ? "text-blue-500" : "text-white"} hover:text-blue-500 flex items-center text-lg  py-2`}>
                                        <div className="list__icon w-[60px] flex justify-center items-center py-2 ">
                                            <RiQuestionnaireLine className='text-2xl' />
                                        </div>
                                        Add Question
                                    </li>
                                </Link>
                                <Link>
                                    <li className={` sidebar__list__item  ${sellectLink == "purchesvideo" ? "text-blue-500" : "text-white"} hover:text-blue-500 flex items-center text-lg  py-2`}>
                                        <div className="list__icon w-[60px] flex justify-center items-center py-2 ">
                                            <BiPurchaseTagAlt className='text-2xl' />
                                        </div>
                                        Purchased Videos
                                    </li>
                                </Link>
                            </ul>
                        </div>
                        <Link className=' overflow-hidden w-[250px] px-3' to={"accound"}>
                            <div className={` sidebar__list__item  ${sellectLink == "accound" ? "text-blue-500" : "text-white"} hover:text-blue-500 flex items-center text-lg  py-2`}>
                                <div className={`list__icon  flex justify-center items-center border  ${sellectLink == "accound" ? "border-white" : "border-transparent"} hover:border-white rounded-full`}>
                                    <img src={profileImage} className='rounded-full h-[40px] w-[40px] ' />
                                </div>
                                <span className='mx-2'>Ali_612</span>
                            </div>
                        </Link>
                    </div>

                </div>

            </motion.nav>

        </div>
    )
}

export default Sidebar