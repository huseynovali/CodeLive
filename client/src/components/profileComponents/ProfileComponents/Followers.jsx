import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import profileImage from "../../../img/User-Profile-PNG-Free-Download.png"
import { Link } from 'react-router-dom';
import { addUserData } from '../../../Store/reducers/dataSlice';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Followers() {
    const { user } = useSelector(state => state?.dataSlice)
    const dispatch = useDispatch()
    const [unfollowUser, setUnfollowUser] = useState([])

    // const followUser = async (paramsValue) => {
    //     const {_id:paramsId} = paramsValue
        
    //     try {

    //        await axios.post(`http://localhost:8080/user/follow/${paramsId}/followUserId/${user?._id}`);
    //         const updateUser = { ...user, followers: [...user?.followers,paramsValue] };
           
    //         setTimeout(() => {
    //             dispatch(addUserData(updateUser));
    //         }, 10000)

    //        toast.success('User Unfollow  !');
    //     } catch (error) {
    //         console.error(error);
    //         toast.error('An error occurred.');
    //     }


    // }

    const unfollow = async (paramsId) => {
        try {

            await axios.post(`http://localhost:8080/user/follow/${paramsId}/followUserId/${user?._id}`);
            const updateUser = { ...user, followers: [...user?.followers.filter(x => x._id !== paramsId)] };
        
                dispatch(addUserData(updateUser));
           

            toast.success('User Unfollow  !');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }
    }




    return (
        <div className='px-5'>
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
                        <Link className='flex items-center'>

                            <img src={item?.image ? `http://localhost:8080/accountimg/images/${item?.image}` : profileImage} alt="video cover image" className='bg-slate-400 h-[50px] w-[50px] object-cover rounded-full' />
                            <h1 className='ml-5 text-xl text-white'>{item?.username}</h1>

                        </Link>
                        <button className='p-2 bg-blue-400 rounded-lg text-white text-sm' onClick={() => { unfollow(item?._id); setUnfollowUser([...unfollowUser, item?._id]) }}>Unfollow</button>
                        {/* <button className='p-2 bg-blue-400 rounded-lg text-white text-sm' onClick={() => { followUser({_id:item?._id,username:item?.username,image:item?.image}); setUnfollowUser([...unfollowUser, item?._id]) }}>Unfollow</button> */}

                    </div>
                })
            }




        </div>
    )
}

export default Followers