import React from 'react'
import { useSelector } from 'react-redux';

function FavoriteVideos() {
    const { user } = useSelector(state => state?.dataSlice)
   console.log(user);
  return (
    <div>



    </div>
  )
}

export default FavoriteVideos