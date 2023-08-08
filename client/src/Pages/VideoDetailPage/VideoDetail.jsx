import axios from 'axios';
import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import { addVideoData } from '../../Store/reducers/dataSlice';

import { BiArrowBack } from "react-icons/bi"
import "./VideoDetail.css"
import { ToastContainer } from 'react-toastify';
import VideoDetailComp from '../../components/VideoDetailComponents/VideoDetailComp';
function VideoDetail(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams()

    const dispatch = useDispatch()

    const { data } = useQuery('videoData', () =>
        axios.get(`http://localhost:8080/video/${id}`), { refetchOnWindowFocus: false, }
    )

    useEffect(() => {
        dispatch(addVideoData(data?.data))
        console.log(data?.data);
    }, [data])


    const goBack = () => {
        navigate(location.state.from)
    };
    return (
        <div className='video__detail__page p-3'>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <button className='p-2 bg-blue-400 rounded-full text-white text-xl' onClick={() => goBack()}><BiArrowBack /></button>
            <div className="video__section w-[90%] m-auto py-5 ">
             <VideoDetailComp/>
            </div>
        </div>
    )
}

export default VideoDetail