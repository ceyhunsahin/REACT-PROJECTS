
import React from 'react';
import "./header.scss";
// import { Link } from "react-router-dom";


const Header = () => {

  return (
   
        <div className="header">

            <ul>
               <li a href = "/"> Home</li>
               <li a href = "/about"> About</li>
               <li a href = "/foryou"> For You</li>
               <li a href = "/services"> Services</li>
               <li a href = "/blog"> Blog</li>
               <li a href = "/contact"> Contact</li>


                
{/*                 <li><Link to="/about">About</Link></li>
                <li><Link to="/foryou">For YOU</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/blog">blog</Link></li>
                <li><Link to="/contact">Contact</Link></li> */}
            </ul>
          
        </div>
 
  
  )
}

export default Header