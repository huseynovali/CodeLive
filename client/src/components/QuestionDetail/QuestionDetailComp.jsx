import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import { Link } from 'react-router-dom';
import logo from '../../img/u.png'
import moment from 'moment';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { addCutomQuestionData } from '../../Store/reducers/dataSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BsCheck, BsCheckLg } from 'react-icons/bs';

function QuestionDetailComp() {
  const userid = getCryptLocalSrtorage("userid")
  const dispatch = useDispatch()
  const { customQuestion } = useSelector(state => state?.dataSlice);
  const { user } = useSelector(state => state?.dataSlice);
  const [textInput, setTextInput] = useState("")
  const answerCorrect = async (paramsId) => {
    try {
      await axios.post(`http://localhost:8080/answer/correct/${userid}/${paramsId}`);
      const updatedAnswers = customQuestion.answers.map(item => {
        if (item._id === paramsId) {
          return {
            ...item,
            correct: [...item.correct, userid], // Kullanıcıyı correct dizisine ekle
            incorrect: item.incorrect.filter(userId => userId !== userid), // Kullanıcıyı incorrect dizisinden çıkar
          };
        }
        return item;
      });

      const updatedQuestion = {
        ...customQuestion,
        answers: updatedAnswers
      };

      console.log("Updated Question", updatedQuestion);
      dispatch(addCutomQuestionData(updatedQuestion));
      toast.success('Answer Liked !');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred.');
    }
  };

  const answerIncorrect = async (paramsId) => {
    try {
      await axios.post(`http://localhost:8080/answer/incorrect/${userid}/64deb6f5814437af491c71d0`);
      const updatedAnswers = customQuestion.answers.map(item => {
        if (item._id === paramsId) {
          return {
            ...item,
            correct: item.correct.filter(userId => userId !== userid),
            incorrect: [...item.incorrect, userid],
          };
        }
        return item;
      });

      const updatedQuestion = {
        ...customQuestion,
        answers: updatedAnswers
      };


      dispatch(addCutomQuestionData(updatedQuestion));
      toast.success('Answer Disliked !');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred.');
    }
  };
  const addAnswer = async () => {
    try {
      if (textInput) {
        const response = await axios.post(`http://localhost:8080/answer/${userid}/${customQuestion?._id}`, {
          content: textInput
        });

        const newAnswer = response.data.newAnswer;

        const updatedAnswers = [...customQuestion.answers, newAnswer];

        const updatedQuestion = {
          ...customQuestion,
          answers: updatedAnswers
        };

        dispatch(addCutomQuestionData(updatedQuestion));
        setTextInput(""); // Metin girdisini sıfırla
        toast.success('Answer added successfully!');
      } else {
        toast.warning('Please enter an answer.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding the answer.');
    }
  }

  console.log(customQuestion);
  return (
    <div className='min-h-screen p-5'>

      <Link to={"/questions"} className='p-2 question__content rounded-full text-white text-xl my-5 inline-block' ><BiArrowBack /></Link>

      <div className="question__content w-[80%] m-auto mt-16 p-5 rounded md">
        <p className='text-xl text-white'>{customQuestion?.text}</p>
        <div className="question__bottom flex justify-center my-2 text-white items-end flex-col">
          <span className='text-lg'>{customQuestion?.author?.username}</span>
          <span className='mx-2 text-sm'>{moment(customQuestion?.createdAt).startOf('minute').fromNow()}</span>
        </div>
      </div>
      <div className="answer__content ">
        {
          customQuestion?.answers?.map(item => {
            console.log(customQuestion);
            return <div className=' question__content w-[80%] m-auto mt-16 p-5 rounded md flex text-white'>
              <div className="answer__left ">
                {customQuestion?.answers?.find(x => x?._id == item?._id).correct.find(x => x == userid) ?
                  <div className='p-2 bg-white text-gray-600 rounded-full' ><BsCheckLg /></div> :
                  <button className='p-2 bg-white text-gray-600 rounded-full' onClick={() => answerCorrect(item?._id)}><AiOutlineCaretUp /></button>
                }

                <div className="voit text-2xl text-center my-3">{parseInt(item?.correct?.length) - parseInt(item?.incorrect?.length)}</div>
                {customQuestion?.answers?.find(x => x?._id == item?._id).incorrect.find(x => x == userid) ?
                  <div className='p-2 bg-white text-gray-600 rounded-full' ><BsCheckLg /></div> :
                  <button className='p-2 bg-white text-gray-600 rounded-full' onClick={() => answerIncorrect(item?._id)}><AiOutlineCaretDown /></button>
                }
              </div>
              <div className="answer__right ml-16 text-xl w-full">
                {item?.content}
              </div>
              <div className="question__bottom flex justify-end my-2 text-white items-end flex-col w-full">
                <span className='text-lg'>{item?.author?.username}</span>
                <span className='mx-2 text-sm'>{moment(item?.createdAt).startOf('minute').fromNow()}</span>
              </div>
            </div>
          })
        }
      </div>

      <div className="add__answer__content">
        <textarea name="" id="" cols="30" rows="10" onChange={(e) => setTextInput(e.target.value.trim())}></textarea>
        <button onClick={() => addAnswer()}>Add Answer</button>
      </div>







    </div>
  )
}

export default QuestionDetailComp