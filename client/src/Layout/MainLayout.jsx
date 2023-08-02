import React from 'react'
import { Outlet } from 'react-router'
import MenuBar from '../components/MenuBar/MenuBar'
import MenuBarMobile from '../components/MenuBarMobile/MenuBarMobile'

function MainLayout() {
    return (
        <div>
            <MenuBar />
            <MenuBarMobile/>
            <Outlet />
        </div>
    )
}

export default MainLayout