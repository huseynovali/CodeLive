import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import profileImage from "../../../img/User-Profile-PNG-Free-Download.png"
import { axiosInstance } from '../../../services/axiosServices'
import { ToastContainer, toast } from 'react-toastify'
import { getCryptLocalSrtorage } from '../../../services/localStorageCrypt'
import { addUserData } from '../../../Store/reducers/dataSlice'
import "./profileComponentsStyle.css"
import SocailIconService from '../SocailIconService'
import UserInfoEditPopup from '../userInfoEditPopup'
function Accound() {
  const data = useSelector(state => state.dataSlice.user)

  const userId = getCryptLocalSrtorage("userid")
  const [sellectImg, setSellectImg] = useState("")
  const [add, setAdd] = useState("")
  const [openPopup,setOpenPopup] = useState(false)
  const dispatch = useDispatch()


  const deletePhoto = async () => {
    try {
      await axiosInstance.delete("/accountimg/images/" + userId)
      toast.success('Accound Image Delete !');
      dispatch(addUserData({ ...data, image: "" }))
    }
    catch (err) {
      toast.error(err)
    }
  }

  const addPhoto = async () => {
    setAdd(true)
    try {
      const formData = new FormData();
      formData.append('image', sellectImg);
      const img = await axiosInstance.post("http://localhost:8080/accountimg/images/" + userId, formData)
      toast.success('Accound Image Add !');
      dispatch(addUserData({ ...data, image: img.data.lastPart }))
      setSellectImg("")
      setAdd("")
    } catch (error) {
      console.log(error);
    }


  }


  return (
    <div className='h-full'>{
            openPopup && <UserInfoEditPopup setOpenPopup={setOpenPopup}/>
          }
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
      <div className="user__profile__info md:flex md:gap-5 h-full">
        <div className="user__profiler__image h-full ">
          {
            data?.image ?
              <img src={`http://localhost:8080/accountimg/images/${data?.image}`} className={` h-[230px] w-full md:w-[230px] object-fill rounded-lg  bg-slate-500 ${data?.image ? "p-0" : "p-1"} `} />
              :
              <input type="file" onChange={(e) => setSellectImg(e.target.files[0])} />
          }
          <div className="user__accound__img__buttons">
            {
              data?.image ?
                <div className='w-[250px]'>
                  {sellectImg && <h1 className='text-white'>Sellect - {sellectImg.name}</h1>}
                  <div className='flex w-[250px] flex-wrap gap-2' >

                    {
                      sellectImg ?
                        <div className='flex gap-2'>
                          <button className='px-3 py-2 bg-blue-400 rounded-md mt-2 text-white' onClick={addPhoto}>Change Photo</button>
                          <button className='px-3 py-2 bg-blue-400 rounded-md mt-2 text-white ' onClick={() => setSellectImg("")}>Reject</button>
                        </div>
                        :
                        <div className="change__photo__input relative w-[105px]">
                          <input type="file" onChange={(e) => setSellectImg(e.target.files[0])} className="opacity-0 w-full z-10 cursor-pointer  absolute inset-0 h-full" />
                          <div className="sellect__button absolute inset-0">
                            <button className='px-3 py-2 bg-blue-300 rounded-md mt-2 text-white'>New Photo</button>
                          </div>

                        </div>

                    }

                    <button className='px-3 py-2 bg-blue-500 rounded-md mt-2  text-white' onClick={() => deletePhoto(data?.image)}>Delete Photo</button>
                  </div>
                </div>
                :
                <button className='px-3 py-2 bg-blue-300 rounded-md mt-2 text-white' onClick={addPhoto}>{add ? "Adding ... " : "Add"}</button>
            }
          </div>
          <div className="user__social__links mt-5">
            <SocailIconService />
          </div>
        </div>

        <div className="user__profile__user__about mt-10 md:mt-0  w-[100%] h-full p-3  rounded-lg overflow-hidden relative">
          <div className="user__profile__user__about__container overflow-y-auto h-[90%] pb-5 overflow-x-hidden ">
            <div className="row">
              <span className='text-white'>Username:</span>
              <h1 className='text-white text-2xl my-3'>{data?.username}</h1>
            </div>
            <hr className='py-3'/>
            <div className="row">
              <span className='text-white'>Email:</span>
              <h1 className='text-white text-2xl my-3'>{data?.email}</h1>
            </div>
            <hr className='py-3'/>
            <div className="row">
              <span className='text-white'>About:</span>
              <p className='text-white text-2xl'>{data?.about}</p>
            </div>
          </div>

          
  

          <button className='px-3 py-2 bg-blue-400 text-white rounded-md absolute bottom-2 right-2' onClick={()=>setOpenPopup(!openPopup)}>{openPopup ? "Close Popup": "Edit User Info"}</button>

        </div>
      </div>

    </div>
  )
}

export default Accound