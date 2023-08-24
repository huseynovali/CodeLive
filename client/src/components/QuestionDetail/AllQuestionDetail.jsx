import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../img/u.png";
import { getCryptLocalSrtorage } from "../../services/localStorageCrypt";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { addAllQuestion } from "../../Store/reducers/dataSlice";


function AllQuestionDetail() {
  const [inputText, setInputText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { allQuestion } = useSelector((state) => state.dataSlice);
  const userid = getCryptLocalSrtorage("userid");
  const username = getCryptLocalSrtorage("username");
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const goToQuestion = (id) => {
    navigate(`/questions/${id}`, { state: { from: location.pathname } });
  };

  const addQuestion = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/question/user/${userid}`,
        { text: inputText }
      );

      const updatedQuestion = [
        ...allQuestion,
        { ...response.data.newQuestion, author: { username } },
      ];

      dispatch(addAllQuestion(updatedQuestion));
      toast.success("Answer updated successfully!");
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the answer.");
    }
  };
  return (
    <div>
      <div className="allquestion__header flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="" className="h-[30px] md:h-[40px] mx-3" />
          <span className="text-white text-2xl">Codelive</span>
        </Link>
        {
          <button
            className="text-white px-3 py-2 bg-slate-600 rounded-md"
            onClick={() => setOpenModal(!openModal)}
          >
            {openModal ? "Close" : "Create Question"}
          </button>
        }
      </div>
      {openModal && (
        <div className="create__question__modal h-[80%] md:w-[50%] md:h-[60%] p-5 m-auto absolute inset-0 rounded-md">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="w-full resize-none rounded-md p-3 text-lg"
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>

          <button
            className="px-3 py-2 bg-purple-600 text-white rounded-md mt-3"
            onClick={() => addQuestion()}
          >
            Create
          </button>
        </div>
      )}

      <div className="my-16">
        {allQuestion?.map((item) => {
          return (
            <div
              onClick={() => goToQuestion(item?._id)}
              className="block question__list w-[90%] m-auto  p-5  my-5 rounded-md"
            >
              <h2 className="text-2xl text-white">{item?.text}</h2>
              <div className="question__bottom flex justify-center my-2 text-white items-end flex-col">
                <span className="text-lg">{item?.author?.username}</span>
                <span className="mx-2 text-sm">
                  {moment(item?.createdAt).startOf("minute").fromNow()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllQuestionDetail;
