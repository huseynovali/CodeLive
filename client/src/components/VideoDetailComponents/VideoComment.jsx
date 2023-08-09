import React, { useState } from 'react'
import { MdEditOff } from 'react-icons/md';
import { BiSolidTrashAlt, BiSend, BiSolidEditAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import moment from 'moment';
import { toast } from 'react-toastify';
import axios from 'axios';
import { addVideoData } from '../../Store/reducers/dataSlice';


function VideoComment() {
    const [commentInput, setCommentInput] = useState("")
    const [editActive, setEditActive] = useState("")
    const data = useSelector(state => state.dataSlice.video)
    const userid = getCryptLocalSrtorage("userid")
    const dispatch = useDispatch()

    const deleteComment = async (id) => {
        try {
            console.log(data?._id);
            await axios.delete(`http://localhost:8080/comment/${id}`);
            const updatedVideo = { ...data, comments: data?.comments?.filter(x => x._id !== id) };
            dispatch(addVideoData(updatedVideo));
            toast.success('Comment Delete !');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }
    }
    const sendComment = async () => {
        try {
            console.log(data?._id);
            console.log(commentInput);
            await axios.post(`http://localhost:8080/comment/${data?._id}/user/${userid}`, { text: commentInput });
            const commentData = {
                text: commentInput,
                author: data?.userid,
                createdAt: new Date()
            }
            const updatedVideo = { ...data, comments: [...data.comments, commentData] };
            dispatch(addVideoData(updatedVideo));
            toast.success('Comment add !');
            setCommentInput("")
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }
    }
    const editComment = async (id, text) => {

        try {
            await axios.put(`http://localhost:8080/comment/${id}`, { text: commentInput });

            const updatedComments = data.comments.map(comment => {
                if (comment._id === id) {
                    return { ...comment, text: commentInput };
                }
                return comment;
            });

            const updatedVideo = { ...data, comments: updatedComments };
            dispatch(addVideoData(updatedVideo));

            setEditActive("");
            setCommentInput("");
            toast.success('Comment updated!');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }
    }





    return (
        <div>

            <h1 className='text-xl text-white py-3'>Comments</h1>
            <div className="add__comment bg-white w-[100%] md:w-[60%] flex rounded-lg ">
                <input type="text" className='bg-transparent w-full p-2 rounded-l-lg outline-none' onChange={(e) => { setCommentInput(e.target.value.trim()) }} />
                <button className='py-2 px-5 bg-blue-500 text-xl text-white rounded-r-lg ' disabled={!commentInput} onClick={() => sendComment()}>
                    <BiSend />
                </button>

            </div>



            <ul className='py-3'>
                {
                    data?.comments?.map(item => {
                        return <li className={`comment__list text-white  my-2 px-3 py-2 rounded-md flex items-center justify-between ${editActive == item._id ? "bg-yellow-400" : ""}`}>
                            <div>
                                <span className='text-sm'>{item?.author?.username}</span>
                                {editActive == item._id ?
                                    <div className='flex'>
                                        <input type="text" value={commentInput} className='bg-white w-full p-2 rounded-l-lg outline-none text-black' onChange={(e) => setCommentInput(e.target.value.trim())} />
                                        <button className='py-2 px-5 bg-blue-500 text-xl text-white rounded-r-lg' disabled={!commentInput} onClick={() => editComment(item?._id, item?.text)}>
                                            <BiSend />
                                        </button>
                                    </div> :
                                    <p className='text-lg'>{item.text}</p>


                                }

                            </div>
                            <div>
                                {item?.author?._id == userid ?
                                    <div>
                                        <button onClick={() => deleteComment(item._id)}>
                                            <BiSolidTrashAlt className='text-2xl text-center' />
                                        </button>

                                        {editActive !== item._id ?
                                            <button onClick={() => {
                                                setCommentInput(item.text);
                                                setEditActive(item._id)
                                            }} className='ml-3'>
                                                <BiSolidEditAlt className='text-2xl text-center ' />
                                            </button> :
                                            <button onClick={() => {
                                                setCommentInput("");
                                                setEditActive("")
                                            }} className='ml-3'>
                                                <MdEditOff className='text-2xl text-center ' />
                                            </button>
                                        }

                                    </div>
                                    :
                                    ""
                                }
                                <p className='text-sm text-white'>{moment(data?.uploadDate).startOf('day').fromNow()}</p>
                            </div>
                        </li>
                    })
                }

            </ul>
        </div>

    )
}

export default VideoComment