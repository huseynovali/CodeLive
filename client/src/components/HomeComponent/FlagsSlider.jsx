import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import FlagAz from "../../img/Flag_of_Azerbaijan.svg.png"
import FlagUz from "../../img/Flag_of_Uzbekistan.svg.png"
import FlagTr from "../../img/Flag_of_Turkey.svg.png"
import FlagTrs from "../../img/Flag_of_Turkmenistan.svg.png"
import FlagRu from "../../img/Flag_of_Russia.svg.png"
import FlagGr from "../../img/Flag_of_Georgia.svg.png"

function FlagsSlider() {




    return (
        <div>
            <>
                <Swiper
                    breakpoints={{
                   
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    autoplay={{
                        delay: 2000,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay]}
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={50}
                    className="mySwiper transition-all px-10 hidden md:block"
                >
                    <SwiperSlide>
                        <img src={FlagAz} alt="flag of Azeribaijan" className='h-[100px] w-[150px]' />
                        <h1 className='text-white ml-7 my-2 text-xl'>Azerbaijan</h1>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={FlagTr} alt="flag of Turkey" className='h-[100px] w-[150px]' />
                        <h1 className='text-white ml-10 my-2 text-xl'>Turkey</h1>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={FlagUz} alt="flag of Uzbekistan" className='h-[100px] w-[150px]' />
                        <h1 className='text-white ml-7 my-2 text-xl'>Uzbekistan</h1>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={FlagTrs} alt="flag of Tukmenistan" className='h-[100px] w-[150px]' />
                        <h1 className='text-white ml-3 my-2 text-xl'>Turkmenistan</h1>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={FlagGr} alt="flag of Georgia" className='h-[100px] w-[150px]' />
                        <h1 className='text-white ml-9 my-2 text-xl'>Georgia</h1>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={FlagRu} alt="flag of Russia" className='h-[100px] w-[150px]' />
                        <h1 className='text-white ml-12 my-2 text-xl'>Russia</h1>
                    </SwiperSlide>

                </Swiper>

            </>

        </div>
    )
}

export default FlagsSlider