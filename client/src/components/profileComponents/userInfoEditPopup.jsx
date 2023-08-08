import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getCryptLocalSrtorage } from '../../services/localStorageCrypt';
import { toast } from 'react-toastify';
import { addUserData } from '../../Store/reducers/userSlice';

function UserInfoEditPopup({setOpenPopup}) {
    const data = useSelector(state => state.userSlice.user)
    const userId = getCryptLocalSrtorage("userid")
    const dispatch = useDispatch()

  const initialValues = {
    username: data?.username,
    email: data?.email,
    about: data?.about,
  };

  const handleSubmit = async(values) => {
      try {
        await axios.put(`http://localhost:8080/user/${userId}`,values)
        toast.success('User Info Edit !');
        dispatch(addUserData({ ...data, username:values.username,email:values.email,about:values.about }))
        setOpenPopup(false)
      } catch (error) {
        toast.error(error.response.data.message);
    
      }
  };

  return (
    <div className='absolute w-[72%] h-[60%] left-[25%] bg-white z-50 p-3 rounded-lg'>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className='mb-4'>
            <label htmlFor='username'>Username:</label>
            <Field
              type='text'
              id='username'
              name='username'
              className='border p-1 w-full'
            />
            <ErrorMessage name='username' component='div' className='text-red-500' />
          </div>

          <div className='mb-4'>
            <label htmlFor='email'>Email:</label>
            <Field
              type='email'
              id='email'
              name='email'
              className='border p-1 w-full'
            />
            <ErrorMessage name='email' component='div' className='text-red-500' />
          </div>

          <div className='mb-4'>
            <label htmlFor='about'>About:</label>
            <Field
              as='textarea'
              id='about'
              name='about'
              className='border p-1 w-full'
              rows='4'
            />
            <ErrorMessage name='about' component='div' className='text-red-500' />
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

export default UserInfoEditPopup;
