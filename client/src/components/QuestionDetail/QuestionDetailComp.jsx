import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { BiArrowBack, BiSolidEditAlt, BiSolidTrashAlt } from 'react-icons/bi';
import { addAllQuestion, addCutomQuestionData } from '../../Store/reducers/dataSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import AnswerDetail from './AnswerDetail';
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import { MdEditOff } from 'react-icons/md';

function QuestionDetailComp() {

  const [commentInput, setCommentInput] = useState("")
  const [editActive, setEditActive] = useState("")
  const dispatch = useDispatch()
  const { customQuestion } = useSelector(state => state?.dataSlice);
  const { allQuestion } = useSelector(state => state?.dataSlice);
  const userid = getCryptLocalSrtorage("userid")
  const navigate = useNavigate()
  const location = useLocation()

  const deleteQuestion = async (questionId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/question/${questionId}`);
      if (response.status === 200) {
        const updatedQuestion = allQuestion?.filter(item => item._id !== questionId);
        dispatch(addAllQuestion(updatedQuestion));
        toast.success('Answer deleted successfully!');
        navigate("/questions")
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting the answer.');
    }
  }
  const editQuestion = async (questionId) => {
    try {
      const response = await axios.put(`http://localhost:8080/question/${questionId}`, { text: commentInput });

      const updatedQuestion = {
        ...customQuestion,
        text: commentInput
      };
      console.log(updatedQuestion);
      dispatch(addCutomQuestionData(updatedQuestion));
      toast.success('Answer updated successfully!');

    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the answer.');
    }
  }
  const goBack = () => {
    navigate(location.state.from)
  };

  return (
    <div className='min-h-screen p-5'>

      <div onClick={() => goBack()} className='p-2 question__content rounded-full text-white text-xl my-5 inline-block' ><BiArrowBack /></div>

      <div className="question__content md:w-[80%] m-auto mt-5 p-5 rounded md text-white">
        <div className='w-full flex justify-between text-white'>

          {editActive ?
            <div className='w-full'>
<textarea value={commentInput}  className='bg-white w-full p-2 rounded-lg outline-none text-black resize-none h-[100px]' onChange={(e) => setCommentInput(e.target.value)} > </textarea>
              <button className='py-2 px-5 bg-blue-500 text-xl text-white rounded-lg' disabled={!commentInput} onClick={() => { editQuestion(customQuestion?._id), setEditActive("") }} >
                save
              </button>
            </div> :

            <p className='text-xl text-white'>{customQuestion?.text}</p>

          }
          {customQuestion?.author?._id == userid ?
            <div className='flex'>
              <button onClick={() => deleteQuestion(customQuestion?._id)}>
                <BiSolidTrashAlt className='text-2xl text-center' />
              </button>

              {!editActive ?
                <button onClick={() => {
                  console.log("sa");
                  setCommentInput(customQuestion?.text);
                  setEditActive("asd")
                }} className='ml-3 z-50'>
                  <BiSolidEditAlt className='text-2xl text-center ' />
                </button> :
                <button onClick={() => {
                  setCommentInput("");
                  setEditActive("")
                }} className='ml-3'>
                  <MdEditOff className='text-2xl text-center ' />
                </button>
              }

            </div>
            :
            ""
          }</div>
        <div className="question__bottom ">

          <div className='flex justify-center my-2 text-white items-end flex-col'>
            <span className='text-lg'>{customQuestion?.author?.username}</span>
            <span className='mx-2 text-sm'>{moment(customQuestion?.createdAt).startOf('minute').fromNow()}</span>
          </div>
        </div>



      </div>
      <AnswerDetail />






    </div>
  )
}

export default QuestionDetailComp