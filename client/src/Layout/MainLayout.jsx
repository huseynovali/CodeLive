import React from 'react'
import { Outlet } from 'react-router'
import MenuBar from '../components/MenuBar'

function MainLayout() {
    return (
        <div>
            <MenuBar />
            <Outlet />
        </div>
    )
}

export default MainLayout