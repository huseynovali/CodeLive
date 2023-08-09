import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { validate } from 'numeral';
import { getCryptLocalSrtorage } from '../../../services/localStorageCrypt';
import { addUserData } from '../../../Store/reducers/dataSlice';

function AddVideo() {
    const {category} = useSelector(state => state?.dataSlice)
    const {user} = useSelector(state => state?.dataSlice)
  
    const userid = getCryptLocalSrtorage("userid")
    const [file, setFieldValue] = useState({
        videoFile: null,
        coverImageFile: null
    })
    console.log(file);
    const initialValues = {
        title: '',
        description: '',
        categoryId: '',
        languageId: '',

    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        categoryId: Yup.string().required('Category is required'),
        languageId: Yup.string().required('Language is required'),
    });

    const onSubmit = async (values) => {
        console.log(values);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('categoryId', values.categoryId);
        formData.append('languageId', values.languageId);
        formData.append('video', file.videoFile);
        formData.append('coverImage', file.coverImageFile);
      
        try {
            const response = await axios.post(`http://localhost:8080/video/${userid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        console.log(response.data);
                toast.success('User Info Edit !');
                const newVideo = [...user?.videos,response.data]
                dispatch(addUserData({ ...user,newVideo  }))
                setOpenPopup(false)
          
      
        } catch (error) {
            console.error(error);
             toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <h1>Add Video</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <div>
                        <label>Video File</label>
                        <input type="file" name="videoFile" onChange={(e) => setFieldValue({ ...file, videoFile: e.target.files[0] })} />
                        <ErrorMessage name="videoFile" component="div" />
                    </div>
                    <div>
                        <label>Cover Image File</label>
                        <input type="file" name="coverImageFile" onChange={(event) => setFieldValue({ ...file, coverImageFile: event.target.files[0] })} />
                        <ErrorMessage name="coverImageFile" component="div" />
                    </div>
                    <div>
                        <label>Title</label>
                        <Field type="text" name="title" />
                        <ErrorMessage name="title" component="div" />
                    </div>
                    <div>
                        <label>Description</label>
                        <Field as="textarea" name="description" />
                        <ErrorMessage name="description" component="div" />
                    </div>
                    <div>
                        <label>Category</label>
                        <Field as="select" name="categoryId">
                            <option value="">Select a category</option>
                            {category?.data?.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="categoryId" component="div" />
                    </div>
                    <div>
                        <label>Language</label>
                        <Field type="text" name="languageId" />
                        <ErrorMessage name="languageId" component="div" />
                    </div>

                    <button type="submit">Add Video</button>
                </Form>
            </Formik>
        </div>
    );
}

export default AddVideo;
