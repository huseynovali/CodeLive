import React, { useState } from 'react'
import { AiFillLinkedin, AiFillGithub, AiFillInstagram, AiFillFacebook, AiOutlineLink, AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../services/axiosServices';
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import { toast } from 'react-toastify';
import { addUserData } from '../../Store/reducers/dataSlice';
import axios from 'axios';
function SocailIconService() {
    const data = useSelector(state => state.dataSlice.user)
    const userId = getCryptLocalSrtorage("userid")
    const [addLink, setAddLink] = useState(false)
    const [linkData, setLinkInput] = useState({
        name: "",
        link: ""
    })
    const dispatch = useDispatch()

    const getIcon = (key) => {
        switch (key) {
            case "Linkedin": return <AiFillLinkedin className="text-2xl" />
            case "Github": return <AiFillGithub className="text-2xl" />
            case "Instagram": return <AiFillInstagram className="text-2xl" />
            case "Facebook": return <AiFillFacebook className="text-2xl" />
            default: return <AiOutlineLink className="text-2xl" />
                break;
        }
    }
    const deleteLinks = async (name) => {
        console.log(name);
        try {
            await axios.delete(`http://localhost:8080/user/social/${userId}/${name}`);
            toast.success('Link Delete !');
            const social = data?.social.filter(item => item.name !== name)
            console.log({ ...data, social });
            dispatch(addUserData({ ...data, social }))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const saveLink = async () => {
        try {
            await axios.post(`http://localhost:8080/user/social/${userId}`, linkData)
            console.log(linkData);
            toast.success('Link Add !');
            const social = [...data?.social, linkData];
            dispatch(addUserData({ ...data, social }))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }




    return (

        <div>
            <ul className='w-[250px]'>
                {
                    data?.social?.map(item => {
                        return (
                            <li className='flex  items-center my-2 text-blue-200 '>
                                <>
                                    <a href={item.link} className='text-sm flex items-center hover:text-blue-500 hover:scale-105'>
                                        {getIcon(item.name)}
                                        <span className='ml-2'>{item.link?.slice(0, 25)}...</span>
                                    </a>
                                </>
                                <AiFillDelete className='text-xl ml-3 cursor-pointer' onClick={() => deleteLinks(item.name)} />
                            </li>
                        )
                    })
                }
            </ul>
            {
                addLink ?
                    <div className="add__links__inputs  ">
                        <div className="inputs__group border h-[30px] rounded-md w-[250px] flex">
                            <select name="" id="" className=' outline-none h-full rounded-l-md' onChange={(e) => setLinkInput({ ...linkData, name: e.target.value })} >
                                <option value="">sellect</option>
                                <option value="Github">
                                    Github
                                </option>
                                <option value="Instagram">
                                    Instagram
                                </option>
                                <option value="Facebook">
                                    Facebook
                                </option>
                                <option value="Linkedin">
                                    Linkedin
                                </option>
                                <option value="Other">
                                    Other
                                </option>
                            </select>
                            <input type="link" className='outline-none  h-full rounded-r-md border-l-2 w-full' onChange={(e) => setLinkInput({ ...linkData, link: e.target.value.trim() })} />
                        </div>
                        <div className="buttons mt-3 flex gap-5">
                            {
                                linkData.name && linkData.link && <button className='px-3 py-2 bg-blue-500 rounded-lg text-white' onClick={() => saveLink()}>Save</button>
                            }

                            <button className='px-3 py-2 bg-blue-500 rounded-lg text-white' onClick={() => { setLinkInput(""); setAddLink(false) }}>Reject</button>
                        </div>

                    </div>
                    :
                    <button className='px-3 py-2 bg-blue-500 rounded-lg text-white mt-3' onClick={() => setAddLink(true)}>Add Links</button>

            }


        </div>
    )
}

export default SocailIconService