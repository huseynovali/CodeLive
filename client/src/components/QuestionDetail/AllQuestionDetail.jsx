import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

function AllQuestionDetail() {
    const { allQuestion } = useSelector(state => state.dataSlice)


    return (
        <div className='my-16'>
            {
                allQuestion?.map(item => {
                    return (
                    <Link to={item?._id} className='block question__list w-[90%] m-auto  p-5  my-5 rounded-md'>
                        <h2 className='text-2xl text-white'>{item?.text}</h2>
                        <div className="question__bottom flex justify-center my-2 text-white items-end flex-col">
                            <span className='text-lg'>{item?.author?.username}</span>
                            <span className='mx-2 text-sm'>{moment(item?.createdAt).startOf('minute').fromNow()}</span>
                        </div>
                    </Link>

                    )
                })
            }



        </div>
    )
}

export default AllQuestionDetail