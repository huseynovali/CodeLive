import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { addCutomQuestionData } from '../../Store/reducers/dataSlice'
import { useParams } from 'react-router'
import QuestionDetailComp from '../../components/QuestionDetail/QuestionDetailComp'
import axios from 'axios'
import Loading from '../Loading/Loading'

function QuestionDetail() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { isLoading, data } = useQuery('question', () =>
    axios.get(`http://localhost:8080/question/${id}`), { refetchOnWindowFocus: false, }
  )


  useEffect(() => {
    dispatch(addCutomQuestionData(data?.data))
  }, [data])

  return (
    <div>
      {
        isLoading ? <Loading /> :
          <div className='question__detail__page'>
            <QuestionDetailComp />
          </div>
      }

    </div>
  )
}

export default QuestionDetail