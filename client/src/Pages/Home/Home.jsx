import React from 'react'
import "./Home.css"
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter'
import { Link } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import logo from '../../img/u.png'


import FlagsSlider from '../../components/HomeComponent/FlagsSlider';


function Home() {

  return (
    <div className='home__page overflow-hidden'>
      <div className="header_navbar">

      </div>
      <div className="header w-full h-screen pb-5">

        <div className="nav__brand">
          <h1 className='text-2xl p-5  text-white md:text-4xl md:px-[50px] md:py-[30px] z-30 relative'>
            <Link to="/" className='flex items-center'>
              <img src={logo} alt="" className='h-[30px] md:h-[40px] mx-2' />
              <span >Codelive</span>
            </Link>
          </h1>
        </div>
        <div className="header__section flex  overflow-hidden justify-between h-full w-full py-[50px] px-[20px]  lg:py-[100px] md:px-[50px] ">
          <motion.div
            className="header__section__img   md:block absolute  right-0 opacity-30   lg:opacity-100"
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="header__section__img__cover"></div>


          </motion.div>

          <motion.div
            className="header__section__text md:w-[60%] lg:w-[40%] text-xl text-white h-full z-10"
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className='h-full w-full md:py-[100px]'>
              <h1 className='text-2xl md:text-4xl lg:text-5xl h-[50px] md:h-[85px]'>Welcome
                <Typewriter

                  words={[
                    " to the World of Knowledge!",
                    ` to have fun!`
                  ]}
                  loop={Infinity}
                  cursor
                  cursorStyle='|'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
              <p className='text-xl'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur inventore ut distinctio delectus nemo,
                itaque animi placeat? Ex earum, laborum iste laboriosam
                nulla neque soluta, repellat voluptates id ab blanditiis.
              </p>
              <Link to="/allvideos">
                <button className='my-3 py-3 px-6 rounded-md'>
                  Get Start
                </button>
              </Link>
            </div>
          </motion.div>
          {/* <div className="splien__div hidden lg:block">
            <Spline scene="https://prod.spline.design/QKvuY4UlDFS1OT5D/scene.splinecode" className='w-[80%] h-screen absolute inset-0 opacity-30 lg:opacity-100 hidden lg:block' />
          </div> */}



        </div>
      </div>


      <div className="section_1 min-h-screen flex justify-between flex-col items-center ">
        <div className=' overflow-hidden lg:w-[600px]'>
          <Spline scene="https://prod.spline.design/EEx1xUVR1xlW4Iua/scene.splinecode" className='w-full h-full relative -left-3' />
        </div>
        <div className="connection__section__text w-full py-10 md:px-5">

          <div className="join__count flex px-9 m-auto pb-24 lg:py-16 flex-col  md:flex-row ">
            <h2 className='md:text-5xl text-4xl font-bold md:w-[350px] text-white my-16'>
              Join in on something big
            </h2>
            <div className="connection__number flex justify-between  md:w-[60%] md:m-auto ">
              <div className="learns__count flex flex-col">
                <span className='md:text-5xl text-4xl text-white font-bold text-center'>1M</span>
                <span className='md:text-2xl text-lg text-white font-bold mt-2 text-center'>Learners</span>
              </div>
              <div className="learns__count flex flex-col">
                <span className='md:text-5xl text-4xl text-white font-bold text-center'>5+</span>
                <span className='md:text-2xl text-lg text-white font-bold mt-2 text-center'>Countries</span>
              </div>
              <div className="learns__count flex flex-col">
                <span className='md:text-5xl text-4xl text-white font-bold text-center'>5k</span>
                <span className='md:text-2xl text-lg text-white font-bold mt-2 text-center'>Video</span>
              </div>
            </div>

          </div>
          <FlagsSlider />
        </div>
      </div>

      <div className="section__2 py-16 px-8 flex justify-between">
        <div className="left w-[30%] flex flex-col items-center">
          <img src={logo} alt="" className='w-[300px] h-[300px] ' />
          <h1 className='text-white md:text-4xl text-center font-bold'>Code{"<"}ive{"/>"}</h1>
        </div>
        <div className="right w-[50%]">
          <h2 className='text-5xl text-white font-bold'>Start for free</h2>
          <p className='text-lg text-white py-5 w-[370px]'>
            If you’ve made it this far, you must be at 
            least a little curious. Sign up and take the 
            first step toward your goals.
          </p>
          <Link to="/allvideos">
            <button className='my-3 py-3 px-6 rounded-md text-white'>
              Get Start
            </button>
          </Link>
        </div>
      </div>

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default Home