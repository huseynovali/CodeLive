import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { addAllVideo } from '../../Store/reducers/dataSlice'
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import AllVideoDetail from '../../components/AllVideoDetail/AllVideoDetail'
import './AllVideo.css'
import Loading from '../Loading/Loading'
function AllVideos() {
    const userid = getCryptLocalSrtorage("userid")
    const [limit, setItemLimit] = useState(7)
    const dispatch = useDispatch()


    const { isLoading, data, refetch } = useQuery('allvideoData', () =>
        axios.get(`http://localhost:8080/video/${limit}`), { refetchOnWindowFocus: false, }
    )

    useEffect(() => {
        dispatch(addAllVideo(data?.data))
       
    }, [data])


    useEffect(() => {
        refetch()
    }, [limit])

    console.log(data?.data?.length);
    const handleShowMore = () => {
        setItemLimit(prevLimit => prevLimit + 10);
    };



    return (
        <div className='All_video relative'>

            {
                isLoading ? <Loading /> : <AllVideoDetail />
            }


        </div>
    )
}

export default AllVideos