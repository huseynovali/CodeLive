import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import { toast } from 'react-toastify';
import { addVideoData } from '../../Store/reducers/dataSlice';

function VideoEditPopup({ setOpen }) {
    const data = useSelector(state => state.dataSlice.video)
    const userId = getCryptLocalSrtorage("userid")
    const dispatch = useDispatch()

    const initialValues = {
        title: data?.title,
        description: data?.description,
    };

    const handleSubmit = async (values) => {
        try {
            await axios.put(`http://localhost:8080/video/${data?._id}`, values)
            toast.success('User Info Edit !');
            dispatch(addVideoData({ ...data, title: values.title, description: values.description }))
            setOpen(false)
        } catch (error) {
            toast.error(error.response.data.message);

        }
    };

    return (
        <div className='fixed w-[52%] h-[50%]  m-auto bg-white z-50 p-3 rounded-lg inset-0'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>

                    <div className='mb-4'>
                        <label htmlFor='title'>Title:</label>
                        <Field
                            type='text'
                            id='title'
                            name='title'
                            className='border p-1 w-full outline-none'
                        />
                        <ErrorMessage name='username' component='div' className='text-red-500' />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='description'>Decription:</label>
                        <Field
                            as='textarea'
                            row={5}
                            id='description'
                            name='description'
                            className='border p-1 w-full resize-none outline-none'
                        />
                        <ErrorMessage name='email' component='div' className='text-red-500' />
                    </div>


                    <button
                        type='submit'
                        className='bg-blue-500 text-white py-2 px-4 rounded'
                    >
                        Save
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default VideoEditPopup;
