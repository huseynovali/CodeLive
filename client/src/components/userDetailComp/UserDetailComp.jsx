import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Github from "../../img/github.png";
import Instagram from "../../img/instagram.png";
import Linkedin from "../../img/linkedin.png";
import Other from "../../img/world-wide-web.png";
import Facebook from "../../img/facebook.png";
import numeral from 'numeral';
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addCutomUserData, addUserData } from '../../Store/reducers/dataSlice';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import profileImg from "../../img/User-Profile-PNG-Free-Download.png"
import coverImg from "../../img/video-icon-17.png"
function UserDetailComp() {
    const userid = getCryptLocalSrtorage("userid")
    const dispatch = useDispatch()
    const { customUser } = useSelector(state => state?.dataSlice);
    const { user } = useSelector(state => state?.dataSlice);
    const [descriptionisOpen, setDescriptionisOpen] = useState(false)

    console.log(customUser);

    const getSocialIcon = (name) => {
        switch (name) {
            case 'Github':
                return Github;
            case 'Instagram':
                return Instagram;
            case 'Linkedin':
                return Linkedin;
            case 'Other':
                return Other;
            case 'Facebook':
                return Facebook;
            default:
                return null;
        }
    }


    const followUser = async (paramsValue) => {
        const { _id: paramsId } = paramsValue
        try {
            await axios.post(`http://localhost:8080/user/follow/${user?._id}/followUserId/${paramsId}`);
            const updateUser = { ...user, follow: [...user?.follow, paramsValue] };
            let updateUserid = { ...customUser, followers: [...customUser?.followers, paramsId] };

           
            dispatch(addUserData(updateUser));
            dispatch(addCutomUserData(updateUserid))
            toast.success('User Follow  !');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }


    }

    const unfollow = async (paramsId) => {
        console.log(customUser);
        try {

            await axios.post(`http://localhost:8080/user/follow/${user?._id}/followUserId/${paramsId}`);
            const updateUser = { ...user, follow: [...user?.follow?.filter(x => x._id !== paramsId)] };
            let updateUserid = { ...customUser, followers: [...customUser?.followers?.filter(x => x !== userid)] };
            console.log(updateUserid);
            dispatch(addUserData(updateUser));
            dispatch(addCutomUserData(updateUserid))
            toast.success('User Unfollow  !');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }
    }

    return (
        <div>
            <div className="user__header__section md:flex w-full justify-between ">
                <div className="user__img lg:w-[25%] md:w-[30%]">
                    {customUser?.image ?
                        <img src={`http://localhost:8080/accountimg/images/${customUser?.image}`} className={` h-[300px] lg:h-[250px] md:h-[200px] md:w-[200px] w-full lg:w-[250px] object-fill rounded-full  bg-slate-500 ${customUser?.image ? "p-0" : "p-1"}`} />
                        :
                        <img src={profileImg} className={` h-[230px] w-full md:w-[230px] object-fill rounded-lg  bg-slate-500  `} />

                    }
                </div>
                <div className="user__info__content  md:w-[70%]">
                    <div className="title__links  md:flex justify-between items-center">
                        <h1 className='text-4xl text-white my-5 md:my-0'>{customUser?.username}</h1>
                        <ul className="social__links flex gap-5">
                            {customUser?.social?.map((item, index) => (
                                <li key={index} className='h-[30px] w-[30px] md:h-[25px] md:w-[25px]  block relative hover:-top-1'>

                                    <a href={item.link} target="_blank" rel="noopener noreferrer ">
                                        <img src={getSocialIcon(item.name)} alt={item.name} className="social__icon w-full h-full" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="user__followers__following md:hidden block my-5 ">
                        <div className='flex'>
                            <p className='flex flex-col justify-center items-center w-full px-10 py-2 rounded-l-md bg-blue-400 text-md text-white border'><span className='font-bold'>{numeral(customUser?.follow?.length).format('0,0a')}</span>following</p>
                            <p className='flex flex-col justify-center items-center w-full px-10 py-2 bg-blue-400 text-md text-white border border-l-0 rounded-r-md'  ><span className='font-bold'>{numeral(customUser?.followers?.length).format('0,0a')}</span>followers</p>
                        </div>

                        {customUser?._id !== userid ? userid &&

                            typeof (customUser?.followers?.find(item => item == userid)) == "string" ?
                            <button className='my-3 w-full bg-blue-500 px-16 py-2 text-xl text-white hover:bg-blue-600 rounded-md border ' onClick={() => { unfollow(customUser._id); }}>Unfollow</button>
                            :
                            <button className='my-3 w-full bg-blue-500 px-16 py-2 text-xl text-white hover:bg-blue-600 rounded-md border ' onClick={() => followUser({ _id: customUser?._id, username: customUser?.username, image: customUser?.image })}>Follow +</button>
                            : <div className='my-3 w-full bg-blue-500 px-16 py-5 text-xl text-white hover:bg-blue-600 rounded-md border ' ></div>

                        }


                    </div>
                    <div className='user__about  pb-10 rounded-md relative my-5'>
                        <motion.div layout className={`text-lg text-white     overflow-hidden  ${customUser?.about?.length > 500 ? descriptionisOpen ? "min-h-max" : "h-[100px]" : "min-h-max"}`}>
                            {customUser?.about}
                            {
                                customUser?.about?.length > 500 && <button className='absolute bottom-1 right-2' onClick={() => setDescriptionisOpen(!descriptionisOpen)}>
                                    {descriptionisOpen ?
                                        "Show Less" : 'Show More'
                                    }
                                </button>
                            }

                        </motion.div>
                    </div>
                    <div className="user__followers__following md:flex hidden">
                        <p className='flex flex-col justify-center items-center px-10 py-2 rounded-l-md bg-blue-400 text-md text-white border'><span className='font-bold'>{numeral(customUser?.follow?.length).format('0,0a')}</span>following</p>
                        <p className='flex flex-col justify-center items-center px-10 py-2 bg-blue-400 text-md text-white border border-l-0' ><span className='font-bold'>{numeral(customUser?.followers?.length).format('0,0a')}</span>followers</p>
                        {console.log()}
                        {customUser?._id !== userid ? userid && userid &&
                           typeof (customUser?.followers?.find(item => item == userid)) == "string" ?
                            <button className='bg-blue-500 px-16 py-2 text-xl text-white hover:bg-blue-600 rounded-r-md border border-l-0' onClick={() => { unfollow(customUser._id); }}>Unfollow</button>
                            :
                            <button className='bg-blue-500 px-16 py-2 text-xl text-white hover:bg-blue-600 rounded-r-md border border-l-0' onClick={() => followUser({ _id: customUser?._id, username: customUser?.username, image: customUser?.image })}>Follow +</button>
                            : <div className=' w-full bg-blue-500 px-16 py-5 text-xl text-white  rounded-r-md border ' ></div>

                        }

                        {/* <button>unFollow</button> */}
                    </div>
                </div>
            </div>
            <div className="user__bottom__section my-10">
                <div className='flex gap-5 gap-y-9 flex-wrap cursor-pointer '>
                    {
                        customUser?.videos?.map(item => {
                            return <div className="user__videos hover:scale-[1.05] transition-all h-[320px] relative shadow-lg rounded-md" onClick={() => goToVideo(item._id)}>
                                <div className="video__cover__img shadow-lg">
                                    <img src={item?.coverImageid ? `http://localhost:8080/accountimg/images/${item?.coverImageid}` : coverImg} alt="video cover image" className='bg-slate-400 h-[200px] w-[300px] object-cover rounded-md' />
                                </div>
                                <div className="video__info__content  p-3">
                                    <h1 className='text-white w-[250px]'>{item?.title.length > 50 ? item?.title.slice(0, 50) + " ..." : item?.title}</h1>
                                    <span className='text-white px-2 py-1 bg-blue-500 rounded-xl text-xs my-2 block max-w-max '>{item?.categoryId?.name}</span>
                                    <div className='flex justify-end items-center absolute bottom-0 right-3 w-full'>
                                        <p className='text-white'> {moment(item?.uploadDate).startOf('minute').fromNow()}</p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>

    );
}

export default UserDetailComp;

