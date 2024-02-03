import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import "../../assets/styles.css"

function Layout() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style = {{backgroundColor : '#F2F7F9'}}>
            <Outlet />
          </main>
          <Footer />

        </div>
    )
}

export default Layout
