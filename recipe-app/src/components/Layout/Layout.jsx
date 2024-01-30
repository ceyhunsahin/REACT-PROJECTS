import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import "../../assets/styles.css"

function Layout() {
    return (
        <div>
          <Navbar />
          <main style = {{backgroundColor : '#F2F7F9'}}>
            <Outlet />
          </main>
          <Footer />

        </div>
    )
}

export default Layout
