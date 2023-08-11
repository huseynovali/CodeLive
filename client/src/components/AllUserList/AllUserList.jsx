import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import profileImage from "../../img/User-Profile-PNG-Free-Download.png"
import { toast } from 'react-toastify';
import { addAllUser, addUserData } from '../../Store/reducers/dataSlice';
import axios from 'axios';

function AllUserList({ handleShowMore, limit }) {
    const { allUsers } = useSelector(state => state.dataSlice)
    const { user } = useSelector(state => state?.dataSlice)
    const [searchUser, setSearchUser] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        setSearchUser(allUsers)
      
    }, [allUsers])

    const searchUserFunc = (params) => {
        setSearchUser(allUsers?.filter(x => x.username.toLocaleLowerCase().includes(params)))
        setSearchInput(params)
    }

    const followUser = async (paramsValue) => {
        const { _id: paramsId } = paramsValue
        try {
            await axios.post(`http://localhost:8080/user/follow/${user?._id}/followUserId/${paramsId}`);
            const updateUser = { ...user, follow: [...user?.follow, paramsValue] };
            dispatch(addUserData(updateUser));
            toast.success('User Follow  !');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }


    }

    const unfollow = async (paramsId) => {
        try {

            await axios.post(`http://localhost:8080/user/follow/${user?._id}/followUserId/${paramsId}`);
            const updateUser = { ...user, follow: [...user?.follow?.filter(x => x._id !== paramsId)] };
            console.log(updateUser);
            dispatch(addUserData(updateUser));
            toast.success('User Unfollow  !');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }
    }

    return (
        <div className='w-[95%] m-auto p-5'>
            <h1 className='text-white text-3xl'>All Users</h1>
            <div className="serach__content mt-10">
                <input type="text" className='px-3 py-2 rounded-md outline-none lg:w-[50%] w-full' placeholder='Search ...' onChange={(e) => searchUserFunc(e.target.value.toLocaleLowerCase().trim())} />
            </div>
            <div className="users__list mt-16">
                {
                    searchUser?.map(item => {
                        return <div className='followers__list  px-3 py-2 rounded-lg my-3  flex items-center justify-between'>
                            <Link className='flex items-center'>

                                <img src={item?.image ? `http://localhost:8080/accountimg/images/${item?.image}` : profileImage} alt="video cover image" className='bg-slate-400 h-[50px] w-[50px] object-cover rounded-full' />
                                <h1 className='ml-2 md:ml-5 text-md md:text-xl text-white'>{item?.username}</h1>

                            </Link>

                            {

                                user?.follow?.find(x => x?._id == item?._id) ? <button className='p-2 bg-blue-400 rounded-lg text-white text-xs md:text-sm' onClick={() => { unfollow(item?._id); }}>Unfollow</button>
                                    : <button className='p-2 bg-blue-400 rounded-lg text-white text-sm' onClick={() => followUser({ _id: item?._id, username: item?.username, image: item?.image })}>Follow</button>
                            }
                        </div>
                    })
                }
                {
                   searchInput || limit > allUsers?.length + 1 ? null :
                        <div className='w-full flex justify-end mb-16 md:mb-0'>
                            <button className="show-more-button px-2 py-1 my-3 bg-blue-400 text-white rounded-md " onClick={handleShowMore}>
                                Show More ...
                            </button>
                        </div>
                }

            </div>

        </div >
    )
}

export default AllUserList