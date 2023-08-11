import React from 'react'
import { Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import "./FormContent.css"
import axios from "axios"
import { useMutation, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCryptLocalSrtorage } from '../../services/localStorageCrypt';

function FormContent() {
  const navigate = useNavigate()
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .matches(/[aA-zZ]/g, "Password must contain at least one letter")
      .matches(/\d/g, "Password must contain at least one number")
  });

  const queryClient = useQueryClient();

  const login = (values) => {
    return axios.post('http://localhost:8080/user/login', values);
  };

  const createUserMutation = useMutation(login, {
    onSuccess: (res) => {
      const data = res.data;
      queryClient.invalidateQueries('users');
      toast.success('Login !');

      setCryptLocalSrtorage('token',data.token)
      setCryptLocalSrtorage('username',data.user.username)
      setCryptLocalSrtorage('userid',data.user._id)
      navigate('/profile/accound');
    },
    onError: (error) => {
      const errorMessage = error.response.data.message
      toast.error('Error :' + errorMessage);
    },
  });




  return (
    <div>
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
      <Formik

        initialValues={{
          email: '',
          password: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          createUserMutation.mutate(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className='flex flex-col w-full p-5 lg:p-16 '>
            <Field name="email" className="auth__input border border-t-0 border-l-0 border-r-0    py-2  outline-none  " placeholder="Email" />
            {errors.email && touched.email ? (
              <div className='text-red-500'>{errors.email}</div>
            ) : null}
            <Field type="password" name="password" className="auth__input border border-t-0 border-l-0 border-r-0    py-2  outline-none   mt-7" placeholder="Password" />
            {errors.password && touched.password ? (
              <div className='text-red-500'>{errors.password}</div>
            ) : null}

            <button type="submit" className="border px-3  py-2 rounded-3xl bg-blue-500 text-white mt-12">Submit</button>

            <div className="form__bottom flex justify-between p-1 mt-3">
              <Link to={"/register"} className='auth__link register__link'>Register</Link>
              {
                localStorage.getItem("instantToken") ? null : <Link className='auth__link froget__password__link' to={"/forgot-password"}>Forgot your password?</Link>
              }

            </div>
          </Form>
        )}
      </Formik>
    </div>



  )
}

export default FormContent