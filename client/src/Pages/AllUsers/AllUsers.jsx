import React, { useEffect, useState } from 'react'
import "./AllUser.css"
import { axiosInstance } from '../../services/axiosServices';
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import { useQuery } from 'react-query';
import axios from 'axios';
import { addAllUser } from '../../Store/reducers/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import AllUserList from '../../components/AllUserList/AllUserList';
import { ToastContainer } from 'react-toastify';
function AllUsers() {

  const userid = getCryptLocalSrtorage("userid")
  const [limit, setItemLimit] = useState(7)
  const dispatch = useDispatch()


  const { data, refetch } = useQuery('AlluserData', () =>
    axios.get(`http://localhost:8080/user/getalluser/${userid}/${limit}`), { refetchOnWindowFocus: false, }
  )

  useEffect(() => {
    dispatch(addAllUser(data?.data))

  }, [data])
  useEffect(() => {
    console.log(data?.data?.length);
    console.log(limit);
    refetch()
    console.log(limit);
  }, [limit])

  console.log(data?.data?.length);
  const handleShowMore = () => {
    setItemLimit(prevLimit => prevLimit + 10);
  };

  return (
    <div className='All__user__page'>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AllUserList handleShowMore={handleShowMore} limit={limit} />
    </div>
  )
}

export default AllUsers