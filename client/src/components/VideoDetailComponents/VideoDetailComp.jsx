import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player'
import moment from 'moment';
import numeral from 'numeral';
import { BiLike, BiSolidLike, BiUserCircle, BiSolidTrashAlt } from 'react-icons/bi';
import axios from 'axios';
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import { toast } from 'react-toastify';
import { addVideoData } from '../../Store/reducers/dataSlice';
function VideoDetailComp() {
    const data = useSelector(state => state.dataSlice.video)
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const userid = getCryptLocalSrtorage("userid")
    console.log(data);
    const dispatch = useDispatch()
    // const handleSeek = newSeekTime => {
    //     setPlayedSeconds(newSeekTime);
    //     console.log(newSeekTime);
    // };

    const handleVideoClick = e => {
        const clickedTime = Math.floor((e.nativeEvent.offsetX / e.target.offsetWidth) * e.target.duration);
        setPlayedSeconds(clickedTime);
        console.log(clickedTime);
    };

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
const deleteComment = async(id)=>{
    try {
        console.log(data?._id);
        await axios.delete(`http://localhost:8080/comment/${id}`);
        const updatedVideo = { ...data, comments: data?.comments?.filter(x => x !== id) };
        dispatch(addVideoData(updatedVideo));
        toast.success('Comment Delete !');
    } catch (error) {
        console.error(error);
        toast.error('An error occurred.');
    }
}


    return (
        <div className="w-full">
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
            <p className='text-2xl text-white py-2'>{data?.title}</p>
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
            <div className="video__info py-5">
                <p className='text-lg text-white'>{data?.description}</p>
            </div>
            <div className="video__comment">




                <ul className='py-3'>
                    {
                        data?.comments?.map(item => {
                            return <li className='text-xl text-white bg-blue-300 my-2 px-3 py-2 rounded-md flex items-center justify-between'>
                                {item.text}
                                {item?.author?._id == userid ?
                                    <button><BiSolidTrashAlt onClick={() => deleteComment(item._id)} /></button>
                                    :
                                    ""
                                }</li>
                        })
                    }

                </ul>
            </div>


        </div>
    )
}

export default VideoDetailComp