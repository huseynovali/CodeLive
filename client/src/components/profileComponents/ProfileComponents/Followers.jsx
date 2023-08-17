import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import profileImage from "../../../img/User-Profile-PNG-Free-Download.png"
import { Link, useNavigate } from 'react-router-dom';
import { addUserData } from '../../../Store/reducers/dataSlice';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Followers() {
    const { user } = useSelector(state => state?.dataSlice)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const followUser = async (paramsValue) => {
        const { _id: paramsId } = paramsValue
        try {
            await axios.post(`http://localhost:8080/user/follow/${user?._id}/followUserId/${paramsId}`);
            const updateUser = { ...user, follow: [...user?.follow, paramsValue] };
            console.log(updateUser);
            dispatch(addUserData(updateUser));
            toast.success('User Follow  !');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }


    }

    const goToUser = (id) => {
        navigate(`/user/${id}`, { state: { from: location.pathname } });
    }


    return (
        <div className='md:px-5'>
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
            <h1 className='text-3xl text-white my-5 mb-10'>Followers</h1>
            {
                user?.followers?.map(item => {
                    return <div className='followers__list  px-3 py-2 rounded-lg my-3  flex items-center justify-between'>
                        <div onClick={()=>goToUser(item?._id)} className='flex items-center'>

                            <img src={item?.image ? `http://localhost:8080/accountimg/images/${item?.image}` : profileImage} alt="video cover image" className='bg-slate-400 h-[50px] w-[50px] object-cover rounded-full' />
                            <h1 className='ml-2 md:ml-5 text-md md:text-xl text-white'>{item?.username}</h1>

                        </div>
                        {
                            user?.follow.find(x => x?._id == item._id) ? <span>Following</span> : <button className='p-2 bg-blue-400 rounded-lg text-white text-sm' onClick={() => followUser({ _id: item?._id, username: item?.username, image: item?.image })}>Follow</button>
                        }


                    </div>
                })
            }




        </div>
    )
}

export default Followers