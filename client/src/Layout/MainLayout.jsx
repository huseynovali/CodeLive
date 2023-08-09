import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import MenuBar from '../components/MenuBar/MenuBar'
import MenuBarMobile from '../components/MenuBarMobile/MenuBarMobile'
import { useDispatch } from 'react-redux'
import { addCategoryData } from '../Store/reducers/dataSlice'
import { useQuery } from 'react-query'
import axios from 'axios'

function MainLayout() {
    const dispatch = useDispatch()
    const { data } = useQuery('categoryData', () =>
        axios.get(`http://localhost:8080/category`), { refetchOnWindowFocus: false, }
    )
    useEffect(() => {
        dispatch(addCategoryData(data))
    }, [data])

    return (
        <div>
            <MenuBar />
            <MenuBarMobile />
            <Outlet />
        </div>
    )
}

export default MainLayout