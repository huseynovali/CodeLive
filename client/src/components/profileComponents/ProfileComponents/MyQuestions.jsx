import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

function MyQuestions() {
  const data = useSelector((state) => state.dataSlice.user);
  const location = useLocation();
  const navigate = useNavigate();
  const goToQuestion = (id) => {
    navigate(`/questions/${id}`, { state: { from: location.pathname } });
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
    <div>
      <div className="flex  gap-y-9 flex-wrap cursor-pointer ">
        <h1 className="text-white text-xl">My Questions</h1>
        {data?.questions?.map((item) => {
          return (
            <div
              onClick={() => goToQuestion(item._id)}
              className="w-full question__content drop-shadow-2xl shadow-white border rounded-md p-5  text-white justify-between flex"
            >
              <div
                className="html-content text-2xl text-white"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
              <span>
                {" "}
                {formatUploadDate(item?.createdAt)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyQuestions;
