import React, { useState } from "react";
import { BsCheck, BsCheckLg } from "react-icons/bs";
import { MdEditOff } from "react-icons/md";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { getCryptLocalSrtorage } from "../../services/localStorageCrypt";
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addCutomQuestionData } from "../../Store/reducers/dataSlice";
import moment from "moment";
import { toast } from "react-toastify";
import RichTextEditor from "react-rte";

function AnswerDetail() {
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );
  const { user } = useSelector((state) => state?.dataSlice);
  const [textInput, setTextInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const userid = getCryptLocalSrtorage("userid");
  const username = getCryptLocalSrtorage("username");
  const { customQuestion } = useSelector((state) => state?.dataSlice);
  const [editActive, setEditActive] = useState("");
  const dispatch = useDispatch();

  const handleEditorChange = (value) => {
    setEditorValue(value);
    setTextInput(value.toString("html"));
  };


  const answerCorrect = async (paramsId) => {
    try {
      await axios.post(
        `http://localhost:8080/answer/correct/${userid}/${paramsId}`
      );
      const updatedAnswers = customQuestion.answers.map((item) => {
        if (item._id === paramsId) {
          return {
            ...item,
            correct: [...item.correct, userid],
            incorrect: item.incorrect.filter((userId) => userId !== userid),
          };
        }
        return item;
      });

      const updatedQuestion = {
        ...customQuestion,
        answers: updatedAnswers,
      };

      console.log("Updated Question", updatedQuestion);
      dispatch(addCutomQuestionData(updatedQuestion));
      toast.success("Answer Liked !");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };

  const answerIncorrect = async (paramsId) => {
    try {
      await axios.post(
        `http://localhost:8080/answer/incorrect/${userid}/64deb6f5814437af491c71d0`
      );
      const updatedAnswers = customQuestion.answers.map((item) => {
        if (item._id === paramsId) {
          return {
            ...item,
            correct: item.correct.filter((userId) => userId !== userid),
            incorrect: [...item.incorrect, userid],
          };
        }
        return item;
      });

      const updatedQuestion = {
        ...customQuestion,
        answers: updatedAnswers,
      };

      dispatch(addCutomQuestionData(updatedQuestion));
      toast.success("Answer Disliked !");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };
  const addAnswer = async () => {
    try {
      if (textInput) {
        const response = await axios.post(
          `http://localhost:8080/answer/${userid}/${customQuestion?._id}`,
          {
            content: textInput,
          }
        );

        const updatedAnswers = [
          ...customQuestion.answers,
          {
            ...response.data.newAnswer,
            author: { _id: userid, username },
          },
        ];

        const updatedQuestion = {
          ...customQuestion,
          answers: updatedAnswers,
        };

        dispatch(addCutomQuestionData(updatedQuestion));
        setTextInput("");
        toast.success("Answer added successfully!");
      } else {
        toast.warning("Please enter an answer.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the answer.");
    }
  };
  const deleteAnswer = async (answerId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/answer/${answerId}`
      );
      if (response.status === 200) {
        const updatedAnswers = customQuestion.answers.filter(
          (item) => item._id !== answerId
        );
        const updatedQuestion = {
          ...customQuestion,
          answers: updatedAnswers,
        };
        dispatch(addCutomQuestionData(updatedQuestion));
        toast.success("Answer deleted successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the answer.");
    }
  };
  const editAnswer = async (answerId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/answer/${answerId}`,
        { content: commentInput }
      );
      if (response.status === 200) {
        const updatedAnswers = customQuestion.answers.map((item) => {
          if (item._id === answerId) {
            return {
              ...item,
              content: commentInput,
            };
          }
          return item;
        });
        const updatedQuestion = {
          ...customQuestion,
          answers: updatedAnswers,
        };
        dispatch(addCutomQuestionData(updatedQuestion));
        toast.success("Answer updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the answer.");
    }
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
    <div className="pb-16">
      <div className="answer__content mt-24">
        {customQuestion?.answers?.map((item) => {
          console.log(customQuestion);
          return (
            <div className=" question__content md:w-[80%] m-auto mt-10 p-5 rounded md flex text-white">
              <div className="answer__left ">
                {customQuestion?.answers
                  ?.find((x) => x?._id == item?._id)
                  .correct.find((x) => x == userid) ? (
                  <div className="p-2 bg-white text-gray-600 rounded-full">
                    <BsCheckLg />
                  </div>
                ) : (
                  <button
                    className="p-2 bg-white text-gray-600 rounded-full"
                    onClick={() => answerCorrect(item?._id)}
                  >
                    <AiOutlineCaretUp />
                  </button>
                )}

                <div className="voit text-2xl text-center my-3">
                  {parseInt(item?.correct?.length) -
                    parseInt(item?.incorrect?.length)}
                </div>
                {customQuestion?.answers
                  ?.find((x) => x?._id == item?._id)
                  .incorrect.find((x) => x == userid) ? (
                  <div className="p-2 bg-white text-gray-600 rounded-full">
                    <BsCheckLg />
                  </div>
                ) : (
                  <button
                    className="p-2 bg-white text-gray-600 rounded-full"
                    onClick={() => answerIncorrect(item?._id)}
                  >
                    <AiOutlineCaretDown />
                  </button>
                )}
              </div>
              <div className="answer__right ml-16 text-xl w-full">
                {editActive == item?._id ? (
                  <div className="">
                    <input
                      value={commentInput}
                      type="text"
                      className="bg-white w-full p-2 rounded-lg outline-none text-black resize-none h-[100px]"
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button
                      className="py-2 px-5 bg-blue-500 text-xl text-white rounded-lg"
                      disabled={!commentInput}
                      onClick={() => {
                        editAnswer(item?._id), setEditActive("");
                      }}
                    >
                      save
                    </button>
                  </div>
                ) : (
                  <div
                  className="html-content text-2xl text-white"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                
                )}
              </div>
              <div className="question__bottom flex justify-between  text-white items-end flex-col w-full h-full">
                {item?.author?._id == userid ? (
                  <div>
                    <button onClick={() => deleteAnswer(item?._id)}>
                      <BiSolidTrashAlt className="text-2xl text-center" />
                    </button>

                    {editActive !== item._id ? (
                      <button
                        onClick={() => {
                          setCommentInput(item.content);
                          setEditActive(item._id);
                        }}
                        className="ml-3"
                      >
                        <BiSolidEditAlt className="text-2xl text-center " />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setCommentInput("");
                          setEditActive("");
                        }}
                        className="ml-3"
                      >
                        <MdEditOff className="text-2xl text-center " />
                      </button>
                    )}
                  </div>
                ) : (
                  ""
                )}

                <div className="answer__info flex   text-white items-center flex-col">
                  <span className="text-lg">{item?.author?.username}</span>
                  <span className="mx-2 text-sm">
                    {formatUploadDate(item?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="add__answer__content md:w-[80%] m-auto mt-16 ">
        {/* <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="w-full resize-none p-5 rounded-md"
          value={textInput}
          placeholder="Answer ..."
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
        ></textarea> */}
      <RichTextEditor value={editorValue} onChange={handleEditorChange}  className="min-h-[300px]"/>

        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              addAnswer(), setTextInput(""),setEditorValue(RichTextEditor.createEmptyValue());
            }}
            className="px-3 py-2 bg-purple-700 text-white rounded-md my-3"
          >
            Add Answer
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnswerDetail;
