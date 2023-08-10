import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'; // Eklediğim kütüphane
import "./profileComponentsStyle.css"
import { getCryptLocalSrtorage } from '../../../services/localStorageCrypt';
import { addUserData } from '../../../Store/reducers/dataSlice';
import { useNavigate } from 'react-router';

function AddVideo() {
    const { category } = useSelector(state => state?.dataSlice)
    const { user } = useSelector(state => state?.dataSlice)
    const dispatch = useDispatch(); // useDispatch ekledim
    const navigate = useNavigate();

    const userid = getCryptLocalSrtorage("userid")
    const [uploadLoading, setLoading] = useState(false)
    const [file, setFile] = useState({
        videoFile: null,
        coverImageFile: null
    });

    const initialValues = {
        title: '',
        description: '',
        categoryId: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        categoryId: Yup.string().required('Category is required'),
    });

    const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('categoryId', values.categoryId);
        formData.append('video', file.videoFile);
        formData.append('coverImage', file.coverImageFile);
        setLoading(true)
        try {
            const response = await axios.post(`http://localhost:8080/video/${userid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false)
            toast.success('Video Added !');
            const newVideo = [...user?.videos, response.data.newVideo];
            dispatch(addUserData({ ...user, videos: newVideo }));
            navigate("/profile/myvideo")
            window.location.reload()

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
            {
                uploadLoading ?
                    <div className="uploadLoading absolute inset-0 w-[125%] h-full bg-white z-50">
                        Loading...
                    </div>
                    :
                    <div className='flex'>

                        <div className="video__upload__content w-full lg:w-[50%]">
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                <Form className=''>
                                    <div className="file__component">
                                        <div className='h-[80px] text-white'>
                                            <label>Video File</label>
                                            <div className="sellect__video relative  h-[40px]">
                                                <input type="file" name="videoFile" onChange={(e) => setFile({ ...file, videoFile: e.target.files[0] })} className="opacity-0 w-full z-10 cursor-pointer  absolute inset-0 h-full" />
                                                <div className="sellect__button absolute inset-0">
                                                    <button className='px-3 w-fill h-full py-2 bg-blue-300 rounded-md mt-2 text-white'>Sellect Video</button>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='h-[80px] text-white'>
                                            <label>Cover Image File</label>
                                            <div className="sellect__coverimg relative  h-[40px]">
                                                <input type="file" name="coverImageFile" onChange={(event) => setFile({ ...file, coverImageFile: event.target.files[0] })}
                                                    className="opacity-0 w-full z-10 cursor-pointer  absolute inset-0 h-full" />
                                                <div className="sellect__button absolute inset-0">
                                                    <button className='px-3 w-fill h-full py-2 bg-blue-300 rounded-md mt-2 text-white'>Sellect Cover Image</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="video__about__component">
                                        <div className='flex flex-col  my-3'>
                                            <label className='text-white'>Title</label>
                                            <Field type="text" name="title" className='p-2 rounded-md lg:w-[50%] outline-none mt-2' />
                                            <ErrorMessage name="title" component="div" className='text-red-500' />
                                        </div>
                                        <div className='flex flex-col  my-3'>
                                            <label className='text-white'>Description</label>
                                            <Field as="textarea" name="description" className='p-2 rounded-md lg:w-[50%] resize-none h-[100px] outline-none mt-2' />
                                            <ErrorMessage name="description" component="div" className='text-red-500' />
                                        </div>
                                        <div className='flex flex-col  my-3'>
                                            <label className='text-white'>Category</label>
                                            <Field as="select" name="categoryId" className='p-2 rounded-md lg:w-[50%] outline-none mt-2'>
                                                <option value="">Select a category</option>
                                                {category?.data?.map(category => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="categoryId" component="div" className='text-red-500' />
                                        </div>
                                        {
                                            file.coverImageFile && file.videoFile && <button type="submit" className='p-3 bg-blue-500 text-white rounded-md mt-5'>Add Video</button>
                                        }

                                    </div>
                                </Form>
                            </Formik>
                        </div>
                        <div className='video__upload__img absolute w-full h-screen left-10 opacity-50 lg:opacity-100 -z-20  lg:w-[50%] lg:h-[80vh] lg:relative'></div>
                    </div>
            }

        </div>
    );
}

export default AddVideo;
