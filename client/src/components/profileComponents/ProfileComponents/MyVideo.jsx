import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import coverImg from "../../../img/video-icon-17.png"
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function MyVideo() {
  const data = useSelector(state => state.dataSlice.user)
  const location = useLocation()
  const navigate = useNavigate();
  const goToVideo = (id) => {
    navigate(`/video/${id}`, { state: { from: location.pathname } });
  }

  return (
    <div className='flex gap-5 gap-y-9 flex-wrap cursor-pointer '>

      {
        data?.videos?.map(item => {
          return <div className="user__videos hover:scale-[1.05] transition-all" onClick={() => goToVideo(item._id)}>
            <div className="video__cover__img">
              <img src={item?.coverImageid ? `http://localhost:8080/accountimg/images/${item?.coverImageid}` : coverImg} alt="video cover image" className='bg-slate-400 h-[200px] w-[300px] object-cover rounded-md' />
              <h1 className='text-white'>{item?.title}</h1>
              {console.log(moment().tz("Asia/Baku").format())}
              <p className='text-white'> {moment(item?.uploadDate).tz('Asia/Baku').startOf('day').fromNow()}</p>
            </div>
          </div>

        })
      }

    </div>
  )
}

export default MyVideo