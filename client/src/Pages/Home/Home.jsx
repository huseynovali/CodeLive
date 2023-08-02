import React from 'react'
import "./Home.css"
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter'
import { Link } from "react-router-dom";
function Home() {

  return (
    <div>
      <div className="header_navbar">

      </div>
      <div className="header">
        <div className="nav__brand">
          <h1 className='text-2xl p-5  text-white md:text-4xl md:px-[50px] md:py-[30px]'>
            <Link to="/">
              Codelive
            </Link>
          </h1>
        </div>
        <div className="header__section flex  overflow-hidden justify-between h-full w-full py-[50px] px-[20px]  lg:py-[100px] md:px-[50px] ">
          <motion.div
            className="header__section__text md:w-[60%] lg:w-[40%] text-xl text-white h-full z-10"
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className='h-full w-full md:py-[150px]'>
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
              <Link to="/video">
                <button className='my-3 py-3 px-6 rounded-md'>
                  Get Start
                </button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="header__section__img   md:block absolute lg:relative right-0 opacity-30 h-full md:h-[60%]  w-full lg:w-[60%] lg:h-[100%] lg:opacity-100"
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
          >

          </motion.div>

        </div>
      </div>



    </div>
  )
}

export default Home