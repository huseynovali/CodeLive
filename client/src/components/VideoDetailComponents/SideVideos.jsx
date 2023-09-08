import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { addAllVideo } from "../../Store/reducers/dataSlice";
import moment from "moment";
import { useLocation, useParams } from "react-router";

function SideVideos({ category }) {
  const [categoryVideo, setCategoryVideo] = useState([]);
  const [limit, setItemLimit] = useState(15);
  const dispatch = useDispatch();
  const location =useLocation()
  const { id } = useParams();
  const { isLoading, data, refetch } = useQuery(
    "allvideoData",
    () => axios.get(`http://localhost:8080/video/${limit}`),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    setCategoryVideo(
      data?.data?.filter((item) => item.categoryId.name == category && item._id !==id )
    );
    dispatch(addAllVideo(data?.data));
  }, [data]);

  function formatUploadDate(uploadDate) {
    const now = moment();
    const date = moment(uploadDate);

    if (now.diff(date, "days") <= 7) {
      return moment(date).startOf("minute").fromNow();
    }

    return date.format("DD.MM.YYYY");
  }
  const goToVideo = (id) => {
    navigate(`/video/${id}`, { state: { from: location.pathname } });
  };
  return (
    <div className="w-full flex flex-col gap-y-5">
      {categoryVideo?.map((item) => {
        return (
          <div
            onClick={() => goToVideo(item._id)}
            className="user__videos hover:scale-[1.05] transition-all h-[320px] relative shadow-lg rounded-md m-auto w-full "
          >
            <div className="video__cover__img shadow-lg">
              <img
                src={
                  item?.coverImageid
                    ? `http://localhost:8080/accountimg/images/${item?.coverImageid}`
                    : coverImg
                }
                alt="video cover image"
                className="bg-slate-400 h-[200px]  object-cover rounded-md w-full"
              />
            </div>
            <div className="video__info__content  p-3">
              <h1 className="text-white w-[250px]">
                {item?.title.length > 50
                  ? item?.title.slice(0, 50) + " ..."
                  : item?.title}
              </h1>
              <span className="text-white px-2 py-1 bg-blue-500 rounded-xl text-xs my-2 block max-w-max ">
                {item?.categoryId?.name}
              </span>

              <div className="flex justify-end items-center absolute bottom-0 right-3 w-full">
                <p className="text-white">
                  {" "}
                  {formatUploadDate(item?.uploadDate)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SideVideos;
