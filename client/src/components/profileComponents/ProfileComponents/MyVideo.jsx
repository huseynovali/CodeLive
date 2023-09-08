import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import coverImg from "../../../img/video-icon-17.png";
import { useLocation, useNavigate } from "react-router-dom";

function MyVideo() {
  const data = useSelector((state) => state.dataSlice.user);
  const location = useLocation();
  const navigate = useNavigate();
  const goToVideo = (id) => {
    navigate(`/video/${id}`, { state: { from: location.pathname } });
  };

  function formatUploadDate(uploadDate) {
    const now = moment();
    const date = moment(uploadDate);

    if (now.diff(date, "days") <= 7) {
      return moment(date).startOf("minute").fromNow();
    }

    return date.format("DD.MM.YYYY");
  }

  return (
    <div className="flex gap-5 gap-y-9 flex-wrap cursor-pointer ">
      {data?.videos?.map((item) => {
        return (
          <div
            className="user__videos hover:scale-[1.05] transition-all h-[320px] relative shadow-lg rounded-md"
            onClick={() => goToVideo(item._id)}
          >
            <div className="video__cover__img shadow-lg">
              <img
                src={
                  item?.coverImageid
                    ? `http://localhost:8080/accountimg/images/${item?.coverImageid}`
                    : coverImg
                }
                alt="video cover image"
                className="bg-slate-400 h-[200px] w-[300px] object-cover rounded-md"
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

export default MyVideo;
