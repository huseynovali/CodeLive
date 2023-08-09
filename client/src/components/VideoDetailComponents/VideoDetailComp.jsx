
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player'
import moment from 'moment';
import numeral from 'numeral';
import { BiLike, BiSolidLike, BiUserCircle } from 'react-icons/bi';
import { motion } from 'framer-motion';
import axios from 'axios';
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import { toast } from 'react-toastify';
import { addVideoData } from '../../Store/reducers/dataSlice';
import VideoComment from './VideoComment';
import VideoEditPopup from './VideoEditPopup';
import { useNavigate } from 'react-router';


function VideoDetailComp() {
    const data = useSelector(state => state.dataSlice.video)
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const userid = getCryptLocalSrtorage("userid")
    const [descriptionisOpen, setDescriptionisOpen] = useState(false)
    const [editPopup, setEditPopup] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    // const handleSeek = newSeekTime => {
    //     setPlayedSeconds(newSeekTime);
    //     console.log(newSeekTime);
    // };

    // const handleVideoClick = e => {
    //     const clickedTime = Math.floor((e.nativeEvent.offsetX / e.target.offsetWidth) * e.target.duration);
    //     setPlayedSeconds(clickedTime);
    //     console.log(clickedTime);
    // };

    const likeToogle = async () => {
        try {
            console.log(data?._id);
            await axios.post(`http://localhost:8080/video/${data?._id}/user/${userid}`);
            const updatedVideo = { ...data, likeBy: [...data?.likeBy, userid] };
            dispatch(addVideoData(updatedVideo));
            toast.success('Video Liked !');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }
    };

    const unlikeToogle = async () => {
        try {
            console.log(data?._id);
            await axios.post(`http://localhost:8080/video/${data?._id}/user/${userid}`);
            const updatedVideo = { ...data, likeBy: data?.likeBy?.filter(id => id !== userid) };
            dispatch(addVideoData(updatedVideo));
            toast.success('Video Unliked !');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }
    };
    const deleteVideo = async () => {
        if (confirm("Are You sure ?")) {
            try {
                await axios.delete(`http://localhost:8080/video/${data?._id}`);
                toast.success('Video DELETE !');
                navigate("/profile/myvideo")
            } catch (error) {
                console.error(error);
                toast.error('An error occurred.');
            }
        } else {
            toast.success('Video UnDELETE !');
        }

    }
    const editVideo = async () => {
        try {
            console.log(data?._id);
            await axios.put(`http://localhost:8080/video/${data._id}`);
            const updatedVideo = { ...data, title, description };
            dispatch(addVideoData(updatedVideo));
            toast.success('Video Unliked !');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }


    }



    return (
        <div className="w-full ">
            <div className="video__content border h-[300px] md:h-[500px]">
                {
                    data?.videoawsid ?
                        <ReactPlayer
                            url={data?.videoawsid ? "http://localhost:8080/video/getvideo/" + data?.videoawsid : ""}
                            controls={true}
                            width={"100%"}
                            height={"100%"}

                        />
                        : <h1>Loading...</h1>
                }
            </div>
            <div className="video__title__part flex justify-between items-center">
                <p className='text-2xl text-white py-2'>{data?.title}</p>
                {data?.userid?._id == userid ?
                    <div>
                        <button className='px-3 py-2 bg-red-400 rounded-md text-white' onClick={() => deleteVideo()}> Delete Video</button>
                        <button className='px-3 py-2 bg-blue-300 rounded-md text-white ml-2' onClick={() => setEditPopup(!editPopup)}>
                            {
                                editPopup ? "Reject Edit" : "Edit Video"
                            }
                        </button>
                    </div>
                    : ""}
            </div>

            <div className="video__author__data flex justify-between text-white py-3">
                <div className='flex items-center '>
                    <BiUserCircle className='text-5xl font-thin' />
                    <h1 className='ml-3 text-2xl'>{data?.userid?.username}</h1>
                </div>
                <div className='flex flex-col'>
                    <div className="video__like flex items-center text-xl">
                        {data?.likeBy?.find(item => item == userid) ?
                            <BiSolidLike className='text-2xl hover:scale-150 cursor-pointer' onClick={() => unlikeToogle()} /> :
                            <BiLike className='text-2xl hover:scale-150 cursor-pointer' onClick={() => likeToogle()} />

                        }

                        <span className='ml-2'>{numeral(data?.likeBy?.length).format('0,0a')}</span>
                    </div>

                    <p className='mt-2'>{moment(data?.uploadDate).startOf('day').fromNow()}</p>


                </div>
            </div>

            <div className='video__info p-5 pb-10 rounded-md relative'>
                <motion.div layout className={`text-lg text-white     overflow-hidden  ${data?.description?.length > 500 ? descriptionisOpen ? "min-h-max" : "h-[100px]" : "min-h-max"}`}>
                    {data?.description}
                    {
                        data?.description?.length > 500 && <button className='absolute bottom-1 right-2' onClick={() => setDescriptionisOpen(!descriptionisOpen)}>
                            {descriptionisOpen ?
                                "Show Less" : 'Show More'
                            }
                        </button>
                    }

                </motion.div>
            </div>

            <div className="video__comment">
                <VideoComment />
            </div>
            <div className="edit__popup">
                {
                    editPopup && <VideoEditPopup setOpen={setEditPopup} />
                }
            </div>
        </div>
    )
}

export default VideoDetailComp