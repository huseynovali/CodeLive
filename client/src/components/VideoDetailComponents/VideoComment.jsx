import React, { useState } from "react";
import { MdEditOff } from "react-icons/md";
import { BiSolidTrashAlt, BiSend, BiSolidEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getCryptLocalSrtorage } from "../../services/localStorageCrypt";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import { addVideoData } from "../../Store/reducers/dataSlice";
import { useNavigate } from "react-router";

function VideoComment() {
  const [commentInput, setCommentInput] = useState("");
  const [editCommentInput, seteditCommentInput] = useState(commentInput);
  const [editActive, setEditActive] = useState("");
  const data = useSelector((state) => state.dataSlice.video);
  console.log(data);
  const userid = getCryptLocalSrtorage("userid");
  const username = getCryptLocalSrtorage("username");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteComment = async (id) => {
    try {
      console.log(data?._id);
      await axios.delete(`http://localhost:8080/comment/${id}`);
      const updatedVideo = {
        ...data,
        comments: data?.comments?.filter((x) => x._id !== id),
      };
      dispatch(addVideoData(updatedVideo));
      toast.success("Comment Delete !");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };
  const sendComment = async () => {
    try {
      console.log(data?._id);
      console.log(commentInput);
      const response = await axios.post(
        `http://localhost:8080/comment/${data?._id}/user/${userid}`,
        { text: commentInput }
      );

      const commentData = {
        ...response.data.newComment,
        author: { _id: userid, username },
      };

      const updatedVideo = {
        ...data,
        comments: [...data.comments, commentData],
      };
      dispatch(addVideoData(updatedVideo));
      toast.success("Comment add !");
      setCommentInput("");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };
  const editComment = async (id, text) => {
    try {
      await axios.put(`http://localhost:8080/comment/${id}`, {
        text: editCommentInput,
      });

      const updatedComments = data.comments.map((comment) => {
        if (comment._id === id) {
          return { ...comment, text: editCommentInput };
        }
        return comment;
      });

      const updatedVideo = { ...data, comments: updatedComments };
      dispatch(addVideoData(updatedVideo));

      setEditActive("");
      setCommentInput("");
      toast.success("Comment updated!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };

  const goToUser = (id) => {
    navigate(`/user/${id}`, { state: { from: location.pathname } });
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
    <div className="">
      <h1 className="text-xl text-white py-3">Comments</h1>
      <div className="add__comment bg-white w-[100%] md:w-[60%] flex rounded-lg ">
        <input
          type="text"
          value={commentInput}
          className="bg-transparent w-full p-2 rounded-l-lg outline-none"
          onChange={(e) => {
            setCommentInput(e.target.value);
          }}
        />
        <button
          className="py-2 px-5 bg-blue-500 text-xl text-white rounded-r-lg "
          disabled={!commentInput}
          onClick={() => {
            sendComment();
          }}
        >
          <BiSend />
        </button>
      </div>

      <ul className="py-3 ">
        {data?.comments?.map((item) => {
          return (
            <li
              className={`comment__list text-white  my-2 px-3 py-2 rounded-md flex items-center justify-between  ${
                editActive == item._id ? "bg-yellow-400" : ""
              }`}
            >
              <div>
                <span
                  onClick={() => goToUser(item?.author?._id)}
                  className="text-sm block cursor-pointer"
                >
                  {item?.author?.username}
                </span>
                {editActive == item._id ? (
                  <div className="flex">
                    <input
                      type="text"
                      value={editCommentInput}
                      className="bg-white w-full p-2 rounded-l-lg outline-none text-black"
                      onChange={(e) => seteditCommentInput(e.target.value)}
                    />
                    <button
                      className="py-2 px-5 bg-blue-500 text-xl text-white rounded-r-lg"
                      disabled={!editCommentInput}
                      onClick={() => {
                        editComment(item?._id, item?.text),
                          seteditCommentInput("");
                      }}
                    >
                      <BiSend />
                    </button>
                  </div>
                ) : (
                  <p className="text-lg">{item.text}</p>
                )}
              </div>
              <div>
                {item?.author?._id == userid ? (
                  <div className="flex justify-end">
                    <button onClick={() => deleteComment(item._id)}>
                      <BiSolidTrashAlt className="text-2xl text-center" />
                    </button>

                    {editActive !== item._id ? (
                      <button
                        onClick={() => {
                          seteditCommentInput(item.text);
                          setEditActive(item._id);
                        }}
                        className="ml-3"
                      >
                        <BiSolidEditAlt className="text-2xl text-center " />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          seteditCommentInput("");
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
                <div className="flex h-full items-end">
                  <p className="text-sm text-white min-w-max ">
                    {formatUploadDate(item?.createdAt)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default VideoComment;
