import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { addVideoData } from "../../Store/reducers/dataSlice";
import { BiArrowBack } from "react-icons/bi";
import "./VideoDetail.css";
import { ToastContainer } from "react-toastify";
import VideoDetailComp from "../../components/VideoDetailComponents/VideoDetailComp";
import Loading from "../Loading/Loading";
import SideVideos from "../../components/VideoDetailComponents/SideVideos";

function VideoDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();

  const { isLoading, data } = useQuery(
    "videoData",
    () => axios.get(`http://localhost:8080/video/getvideo/${id}`),
    { refetchOnWindowFocus: false }
  );
  console.log(data);
  useEffect(() => {
    dispatch(addVideoData(data?.data));
   
  }, [data]);

  const goBack = () => {
    navigate(location.state.from);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="video__detail__page p-3">
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
          <button
            className="p-2 go__back__button rounded-full text-white text-xl"
            onClick={() => goBack()}
          >
            <BiArrowBack />
          </button>
          <div className="flex ">
            <div className="video__section w-[90%] lg:w-[70%] m-auto flex flex-col ">
              <VideoDetailComp />
            </div>
            <div className=" sidevideo   w-[25%]  overflow-auto hidden lg:block h-screen  p-2 rounded-md">
            <SideVideos  category={data?.data?.categoryId?.name}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoDetail;
