import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { addCutomUserData } from '../../Store/reducers/dataSlice';
import Loading from '../Loading/Loading';
import UserDetailComp from '../../components/userDetailComp/UserDetailComp';
import { useQuery } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';

function UserDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams()
  

    const goBack = () => {
        navigate(location.state.from)
    };

    const dispatch = useDispatch()

    const { isLoading, data } = useQuery('videoData', () =>
        axios.get(`http://localhost:8080/user/${id}`), { refetchOnWindowFocus: false, }
    )


    useEffect(() => {
        dispatch(addCutomUserData(data?.data))
    }, [data])


    return (
        <div>
            {
                isLoading ? <Loading /> :
                    <div className='video__detail__page md:p-3'>
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
                        <button className='p-2 bg-blue-400 rounded-full text-white text-xl' onClick={() => goBack()}><BiArrowBack /></button>
                        <div className="w-[90%] lg:w-[70%] m-auto py-5 ">
                            <UserDetailComp />
                        </div>
                    </div>
            }
        </div>
    )
}

export default UserDetail