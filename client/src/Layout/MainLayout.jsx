import React from 'react'
import { Outlet } from 'react-router'
import MenuBar from '../components/MenuBar'

function MainLayout() {
    return (
        <div>MainLayout
            <MenuBar />
            <Outlet />
        </div>
    )
}

export default MainLayout