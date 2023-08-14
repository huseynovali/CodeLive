import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { BsFilterCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

function AllVideoDetail() {
    const { category } = useSelector(state => state?.dataSlice);
    const { allVideo } = useSelector(state => state.dataSlice);
    const [searchVideo, setSearchVideo] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedTimeFilter, setSelectedTimeFilter] = useState("");
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setSearchVideo(allVideo);
    }, [allVideo]);

    const searchVideoFunc = () => {
        const filteredVideos = allVideo.filter(x => x.title.toLowerCase().includes(searchInput));
        applyFilters(filteredVideos);
    };

    const applyFilters = (videos) => {
        let filteredVideos = [...videos];

        if (selectedTimeFilter === "lastHour") {

            filteredVideos = filteredVideos.filter(item => moment(item.uploadDate).isAfter(moment().subtract(1, "hour")));
        } else if (selectedTimeFilter === "thisDay") {

            filteredVideos = filteredVideos.filter(item => moment(item.uploadDate).isAfter(moment().subtract(1, "day")));
        } else if (selectedTimeFilter === "thisWeek") {
            filteredVideos = filteredVideos.filter(item => moment(item.uploadDate).isAfter(moment().subtract(1, "week")));
        } else if (selectedTimeFilter === "thisMonth") {
            filteredVideos = filteredVideos.filter(item => moment(item.uploadDate).isAfter(moment().subtract(1, "month")));
        } else if (selectedTimeFilter === "thisYear") {
            filteredVideos = filteredVideos.filter(item => moment(item.uploadDate).isAfter(moment().subtract(1, "year")));
        }

        if (selectedCategoryFilter !== "") {
            filteredVideos = filteredVideos.filter(item => item.categoryId?.name === selectedCategoryFilter);
        }

        setSearchVideo(filteredVideos);
    };
    const goToVideo = (id) => {
        navigate(`/video/${id}`, { state: { from: location.pathname } });
    }

    return (
        <div className='p-5'>
            <div className="filter__videos flex w-full">
                <div className="search__content flex w-[50%] m-auto">
                    <input type="text" className='w-full p-2 rounded-md outline-none' onChange={(e) => setSearchInput(e.target.value.toLocaleLowerCase().trim())} />
                    <button className='px-3 py-2 text-white bg-blue-500 rounded-md ml-3' onClick={() => searchVideoFunc()}>Search</button>
                </div>
                <button className='p-2 rounded-md flex gap-2 items-center bg-blue-400 text-white' onClick={() => setOpenModal(!openModal)}>
                    Filter <BsFilterCircle />
                </button>

            </div>


            <div className='flex gap-5 gap-y-9 flex-wrap  my-16'>
                {
                    searchVideo?.map(item => {
                        return <div onClick={() => goToVideo(item._id)} className="user__videos hover:scale-[1.05] transition-all h-[320px] relative shadow-lg rounded-md" >
                            <div className="video__cover__img shadow-lg">
                                <img src={item?.coverImageid ? `http://localhost:8080/accountimg/images/${item?.coverImageid}` : coverImg} alt="video cover image" className='bg-slate-400 h-[200px] w-[300px] object-cover rounded-md' />
                            </div>
                            <div className="video__info__content  p-3">
                                <h1 className='text-white w-[250px]'>{item?.title.length > 50 ? item?.title.slice(0, 50) + " ..." : item?.title}</h1>
                                <span className='text-white px-2 py-1 bg-blue-500 rounded-xl text-xs my-2 block max-w-max '>{item?.categoryId?.name}</span>

                                <div className='flex justify-end items-center absolute bottom-0 right-3 w-full'>
                                    <p className='text-white'> {moment(item?.uploadDate).startOf('minute').fromNow()}</p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>


            {
                openModal &&
                <div className="filter__modal  max-w-max max-h-max bg-white m-auto absolute inset-0 p-5">
                    <h1 className='font-medium ml-5 text-xl'>Search filters</h1>
                    <div className="  flex ">

                        <div className="filter__time p-5">
                            <h1 >Time</h1>
                            <hr className='my-3' />
                            <ul className='flex  flex-col gap-3'>
                                <li
                                    className={`hover:opacity-80 hover:scale-105 cursor-pointer ${selectedTimeFilter === "lastHour" ? "text-blue-500 font-semibold" : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedTimeFilter("lastHour");
                                        applyFilters(allVideo);
                                    }}
                                >
                                    The Last Hour
                                </li>
                                <li
                                    className={`hover:opacity-80 hover:scale-105 cursor-pointer ${selectedTimeFilter === "thisDay" ? "text-blue-500 font-semibold" : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedTimeFilter("thisDay");
                                        applyFilters(allVideo);
                                    }}
                                >
                                    This day
                                </li>
                                <li
                                    className={`hover:opacity-80 hover:scale-105 cursor-pointer ${selectedTimeFilter === "thisWeek" ? "text-blue-500 font-semibold" : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedTimeFilter("thisWeek");
                                        applyFilters(allVideo);
                                    }}
                                >
                                    This week
                                </li>

                                <li
                                    className={`hover:opacity-80 hover:scale-105 cursor-pointer ${selectedTimeFilter === "thisMonth" ? "text-blue-500 font-semibold" : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedTimeFilter("thisMonth");
                                        applyFilters(allVideo);
                                    }}
                                >
                                    This Month
                                </li>
                                <li
                                    className={`hover:opacity-80 hover:scale-105 cursor-pointer ${selectedTimeFilter === "thisYear" ? "text-blue-500 font-semibold" : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedTimeFilter("thisYear");
                                        applyFilters(allVideo);
                                    }}
                                >
                                    This Year
                                </li>
                                {/* <li className='hover:opacity-80 hover:scale-105 cursor-pointer'>the last hour</li>
                                <li className='hover:opacity-80 hover:scale-105 cursor-pointer'></li>
                                <li className='hover:opacity-80 hover:scale-105 cursor-pointer'>this week</li>
                                <li className='hover:opacity-80 hover:scale-105 cursor-pointer'>this month</li>
                                <li className='hover:opacity-80 hover:scale-105 cursor-pointer'>this year</li> */}
                            </ul>
                        </div>
                        <div className="filter__category p-5">
                            <h1 className=''>Category</h1>
                            <hr className='my-3' />

                            <ul className='flex  flex-col gap-3'>

                                {category?.data?.map(category => (
                                    <li
                                        key={category._id}
                                        className={`hover:opacity-80 hover:scale-105 cursor-pointer ${selectedCategoryFilter === category.name ? "text-blue-500 font-semibold" : ""
                                            }`}
                                        onClick={() => {
                                            setSelectedCategoryFilter(category.name);
                                            applyFilters(allVideo);
                                        }}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>


                    </div>
                </div>
            }


        </div>
    )
}

export default AllVideoDetail