import React, { useEffect } from 'react'
import "./Questions.css"
import logo from '../../img/u.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { addAllQuestion } from '../../Store/reducers/dataSlice'
import { useQuery } from 'react-query';
import QuestionDetail from '../../components/QuestionDetail/QuestionDetail';
function Questions() {

    const dispatch = useDispatch()

    const { isLoading, data } = useQuery('question', () =>
        axios.get(`http://localhost:8080/question`), { refetchOnWindowFocus: false, }
    )


    useEffect(() => {
        dispatch(addAllQuestion(data?.data))
    }, [data])

    return (
        <div className='question__page h-screen p-5'>
            <Link to="/" className='flex items-center'>
                <img src={logo} alt="" className='h-[30px] md:h-[40px] mx-3' />
                <span className='text-white text-2xl'>Codelive</span>
            </Link>

            <QuestionDetail/>
        </div>
    )
}

export default Questions