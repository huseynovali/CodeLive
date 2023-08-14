import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import MenuBar from '../components/MenuBar/MenuBar'
import MenuBarMobile from '../components/MenuBarMobile/MenuBarMobile'
import { useDispatch } from 'react-redux'
import { addCategoryData, addUserData } from '../Store/reducers/dataSlice'
import { useQuery } from 'react-query'
import axios from 'axios'
import { getCryptLocalSrtorage } from '../services/localStorageCrypt'
import { axiosInstance } from '../services/axiosServices'

function MainLayout() {
    const userid = getCryptLocalSrtorage("userid")
    const token = getCryptLocalSrtorage("token")
    const dispatch = useDispatch()

    const { data: user } = useQuery('userData', () =>
        axiosInstance.get(`/user/${userid}/${token}`), { refetchOnWindowFocus: false, }
    )

    useEffect(() => {
        dispatch(addUserData(user?.data))

    }, [user])





    const { data: category } = useQuery('categoryData', () =>
        axios.get(`http://localhost:8080/category`), { refetchOnWindowFocus: false, }
    )

    useEffect(() => {
        dispatch(addCategoryData(category?.data))
   
    }, [category])

    return (
        <div>
            <MenuBar />
            <MenuBarMobile />
            <Outlet />
        </div>
    )
}

export default MainLayout