import React from 'react'
import "./login.css"
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLeft } from 'react-icons/ai'
import axios from "axios"
import { useMutation, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Field, Form, Formik } from 'formik';
function ForgotPassword() {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  })
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const frogetPassword = (values) => {
    return axios.post('http://localhost:8080/user/api/forgot-password', values);
  };

  const createUserMutation = useMutation(frogetPassword, {
    onSuccess: (res) => {
      localStorage.setItem("instantToken",JSON.stringify(res.data.token))
      console.log(res.data);
      queryClient.invalidateQueries('users');
      toast.success('Login !');
      navigate('/login');
    },
    onError: (error) => {
      const errorMessage = error.response.data.message
      toast.error('Error :' + errorMessage);
    },
  });
  return (
    <div className='login__page  w-full h-screen overflow-hidden'>
      <div className="div relative z-10">
        <div className="decoration__image absolute  w-full h-screen overflow-hidden -z-10">
          <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" >
            <path fill="#4144EB" d="M49.9,-67.1C64.8,-57.8,77.2,-43.4,82.8,-26.8C88.3,-10.1,87.1,8.9,79.1,23.2C71,37.5,56.1,47.1,41.8,58.9C27.5,70.6,13.7,84.5,-1.4,86.4C-16.5,88.3,-33,78.3,-42,64.8C-50.9,51.3,-52.3,34.4,-55.1,19.4C-57.9,4.4,-62.2,-8.6,-58.3,-18.4C-54.4,-28.2,-42.3,-34.9,-31.2,-45.4C-20.1,-56,-10,-70.4,3.7,-75.5C17.5,-80.7,34.9,-76.4,49.9,-67.1Z" transform="translate(50 100)" />
          </svg>
        </div>
        <div className="decoration__image absolute  w-full h-screen overflow-hidden -z-10">
          <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4144EB" d="M47.2,-62.9C61.4,-54.6,73.4,-41.2,75.7,-26.4C78,-11.7,70.6,4.4,66,22.3C61.4,40.2,59.5,59.8,49,69.8C38.5,79.8,19.2,80,1.9,77.4C-15.5,74.9,-31,69.4,-45.8,60.9C-60.6,52.3,-74.6,40.5,-80.6,25.4C-86.7,10.3,-84.7,-8.3,-77.9,-24.1C-71.1,-39.9,-59.5,-52.9,-45.7,-61.3C-31.9,-69.7,-16,-73.6,0.3,-73.9C16.5,-74.3,33,-71.2,47.2,-62.9Z" transform="translate(340 50)" />
          </svg>
        </div>
      </div>
      <div className="login__container w-[80vw] h-[60vh] md:h-[40vh] lg:h-[80vh]   m-auto mt-[20vh] md:mt-[30vh] lg:mt-[10vh] relative z-30 rounded-lg flex ">
        <Link className='text-2xl p-2 bg-blue-500 w-[41px] h-[41px] text-white rounded-full absolute inset-5 border hover:border-blue-700' to={"/"}>
          <AiOutlineLeft />
        </Link>
        <div className="form__content py-16 w-full md:w-[50%]">
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
                <button type="submit" className="border px-3  py-2 rounded-3xl bg-blue-500 text-white mt-12">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="forget__content__img w-[50%] h-full hidden md:block"></div>


      </div>
    </div>
  )
}

export default ForgotPassword