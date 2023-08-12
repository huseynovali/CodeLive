import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { BsFilterCircle } from 'react-icons/bs';
function AllVideoDetail() {

    const { allVideo } = useSelector(state => state.dataSlice)
    const [searchVideo, setSearchVideo] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [openModal,setOpenModal]=useState(false)

    useEffect(() => {
        setSearchVideo(allVideo)
        console.log(allVideo);
    }, [allVideo])

    const searchVideoFunc = () => {
        setSearchVideo(allVideo?.filter(x => x.title.toLocaleLowerCase().includes(searchInput)))
    }

   



    return (
        <div className='p-5'>
            <div className="filter__videos flex w-full">
                <div className="search__content flex w-[50%] m-auto">
                    <input type="text" className='w-full p-2 rounded-md outline-none' onChange={(e) => setSearchInput(e.target.value.toLocaleLowerCase().trim())} />
                    <button className='px-3 py-2 text-white bg-blue-500 rounded-md ml-3' onClick={() => searchVideoFunc()}>Search</button>
                </div>
                <button className='p-2 rounded-md flex gap-2 items-center bg-blue-400 text-white'>
                    Filter <BsFilterCircle />
                </button>

            </div>


            <div className='flex gap-5 gap-y-9 flex-wrap cursor-pointer my-16'>
                {
                    searchVideo?.map(item => {
                        return <div className="user__videos hover:scale-[1.05] transition-all h-[320px] relative shadow-lg rounded-md" onClick={() => goToVideo(item._id)}>
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


        </div>
    )
}

export default AllVideoDetail