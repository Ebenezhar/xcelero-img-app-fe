import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/Navbar/Navbar'

function HomePage() {
    return (
        <div >
            <NavBar />
            <div>
                <Outlet />
            </div>

        </div>
    )
}

export default HomePage