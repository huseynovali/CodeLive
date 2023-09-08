import React from "react";
import "./Home.css";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import logo from "../../img/u.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";

import FlagsSlider from "../../components/HomeComponent/FlagsSlider";

function Home() {
  return (
    <div className="home__page overflow-hidden">
      <div className="header_navbar"></div>

      <div className="header w-full h-screen pb-5">
        <div className="nav__brand">
          <h1 className="text-2xl p-5  text-white md:text-4xl md:px-[50px] md:py-[30px] z-30 relative">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="" className="h-[30px] md:h-[40px] mx-2" />
              <span>Codelive</span>
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
            <div className="h-full w-full md:py-[100px]">
              <h1 className="text-2xl md:text-4xl lg:text-5xl h-[50px] md:h-[85px]">
                Welcome
                <Typewriter
                  words={[" to the World of Knowledge!", ` to have fun!`]}
                  loop={Infinity}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
              <p className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur inventore ut distinctio delectus nemo, itaque animi
                placeat? Ex earum, laborum iste laboriosam nulla neque soluta,
                repellat voluptates id ab blanditiis.
              </p>
              <Link to="/allvideos">
                <button className="my-3 py-3 px-6 rounded-md">Get Start</button>
              </Link>
            </div>
          </motion.div>
          {/* <div className="splien__div hidden lg:block">
            <Spline scene="https://prod.spline.design/QKvuY4UlDFS1OT5D/scene.splinecode" className='w-[80%] h-screen absolute inset-0 opacity-30 lg:opacity-100 hidden lg:block' />
          </div> */}
        </div>
      </div>

      <div className="section_1 min-h-screen  flex justify-between flex-col items-center ">
        <div className=" overflow-hidden lg:w-[600px]">
          <Spline
            scene="https://prod.spline.design/EEx1xUVR1xlW4Iua/scene.splinecode"
            className="w-full h-full relative -left-3"
          />
        </div>
        <div className="connection__section__text w-full py-10 md:px-5">
          <div className="join__count flex px-9 m-auto pb-24 lg:py-16 flex-col  md:flex-row ">
            <h2 className="md:text-5xl text-4xl font-bold md:w-[350px] text-white my-16">
              Join in on something big
            </h2>
            <div className="connection__number flex justify-between  md:w-[60%] md:m-auto ">
              <div className="learns__count flex flex-col">
                <span className="md:text-5xl text-4xl text-white font-bold text-center">
                  1M
                </span>
                <span className="md:text-2xl text-lg text-white font-bold mt-2 text-center">
                  Learners
                </span>
              </div>
              <div className="learns__count flex flex-col">
                <span className="md:text-5xl text-4xl text-white font-bold text-center">
                  5+
                </span>
                <span className="md:text-2xl text-lg text-white font-bold mt-2 text-center">
                  Countries
                </span>
              </div>
              <div className="learns__count flex flex-col">
                <span className="md:text-5xl text-4xl text-white font-bold text-center">
                  5k
                </span>
                <span className="md:text-2xl text-lg text-white font-bold mt-2 text-center">
                  Video
                </span>
              </div>
            </div>
          </div>
          <FlagsSlider />
        </div>
      </div>

      <div className="section__2 py-16 px-8 flex justify-between md:flex-row flex-col">
        <div className="left w-full md:w-[30%]  flex-col items-center flex">
          <img src={logo} alt="" className="w-[300px] h-[300px] " />
          <h1 className="text-white text-3xl md:text-4xl text-center font-bold hidden md:block">
            Code{"<"}ive{"/>"}
          </h1>
        </div>
        <div className="right w-full md:w-[50%] my-3 md:my-0">
          <h2 className="text-3xl md:text-5xl text-white font-bold">
            Start for free
          </h2>
          <p className="text-lg text-white py-5 md:w-[370px]">
            If you’ve made it this far, you must be at least a little curious.
            Sign up and take the first step toward your goals.
          </p>
          <Link to="/allvideos">
            <button className="my-3 py-3 px-6 rounded-md text-white">
              Get Start
            </button>
          </Link>
        </div>
      </div>
      <div className="section__3 py-16 px-7">
        <>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper md:w-[500px] h-[400px] md:h-[350px]"
          >
            <SwiperSlide className="p-5">
              <div className="user__thoughts__left ">
                <span className="my-3 block text-xl">
                  <BiSolidQuoteAltLeft />
                </span>
                <p className="italic">
                  Thanks to Codelive, Booz Allen has armed our workforce,
                  specifically its data scientists, with highly relevant and
                  in-demand tech skills that are enabling consultants to stay
                  ahead of big data trends and raise the bar on proficiency,
                  skills, and competencies to meet client demand.
                </p>
                <h3 className="text-xl text-end mt-9">Jim Hemgen</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="p-5">
              <div className="user__thoughts__left ">
                <span className="my-3 block text-xl">
                  <BiSolidQuoteAltLeft />
                </span>
                <p className="italic">
                  With CodeLive employees were able to marry the two together,
                  technology and consultant soft skills. We're thankful that
                  once they got in and took their key IT courses on AWS, Azure,
                  Google Cloud, Big Data, and DevOps that they efficiently moved
                  over to Consulting courses to help drive their career forward
                </p>
                <h3 className="text-xl text-end mt-9">Ian Stevens</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="p-5">
              <div className="user__thoughts__left ">
                <span className="my-3 block text-xl">
                  <BiSolidQuoteAltLeft />
                </span>
                <p className="italic">
                  To stay at the leading edge of IT innovation, your team needs
                  to regularly reinvent its skillset. With CodeLive, I can give
                  my team the space to learn and take the initiative. It means
                  we can produce higher quality work more quickly.
                </p>
                <h3 className="text-xl text-end mt-9">Ismaeel Ameen</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="p-5">
              <div className="user__thoughts__left ">
                <span className="my-3 block text-xl">
                  <BiSolidQuoteAltLeft />
                </span>
                <p className="italic">
                  CodeLive has been a great platform to stay competitive in the
                  digital transformation of the workplace by offering fresh,
                  relevant, personalized on-demand learning content powered by a
                  dynamic content marketplace.
                </p>
                <h3 className="text-xl text-end mt-9">Karen Hunter</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="p-5">
              <div className="user__thoughts__left ">
                <span className="my-3 block text-xl">
                  <BiSolidQuoteAltLeft />
                </span>
                <p className="italic">
                  With CodeLive employees were able to marry the two together,
                  technology and consultant soft skills. We're thankful that
                  once they got in and took their key IT courses on AWS, Azure,
                  Google Cloud, Big Data, and DevOps that they efficiently moved
                  over to Consulting courses to help drive their career forward
                </p>
                <h3 className="text-xl text-end mt-9">Ian Stevens</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="p-5">
              <div className="user__thoughts__left ">
                <span className="my-3 block text-xl">
                  <BiSolidQuoteAltLeft />
                </span>
                <p className="italic">
                  Thanks to Codelive, Booz Allen has armed our workforce,
                  specifically its data scientists, with highly relevant and
                  in-demand tech skills that are enabling consultants to stay
                  ahead of big data trends and raise the bar on proficiency,
                  skills, and competencies to meet client demand.
                </p>
                <h3 className="text-xl text-end mt-9">Jim Hemgen</h3>
              </div>
            </SwiperSlide>
          </Swiper>
        </>
      </div>
      <footer className="py-16 flex justify-center">
        <div className="footer__left flex w-[40%] m-auto">
          <img src={logo} alt="" className="w-[35px] h-[35px] " />
          <h1 className="text-white ml-3 text-lg opacity-80">CodeLive</h1>
        </div>
        <div className="footer__right flex w-[40%] m-auto justify-end">
          <h1 className="text-white ml-3 text-lg opacity-80">
            © 2023 CodeLive
          </h1>
        </div>
      </footer>
    </div>
  );
}

export default Home;
