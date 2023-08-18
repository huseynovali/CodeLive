import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';

function QuestionDetail() {
    const { allQuestion } = useSelector(state => state.dataSlice)
    console.log(allQuestion);
    return (
        <div>
            {
                allQuestion?.map(item => {
                    return (<div>
                        <h2>{item?.text}</h2>
                        <div className="question__bottom">
                            <span>{item?.author?.username}</span>
                            <span>{moment(item?.createdAt).startOf('minute').fromNow()}</span>
                        </div>
                    </div>

                    )
                })
            }



        </div>
    )
}

export default QuestionDetail