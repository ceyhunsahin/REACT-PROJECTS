import React from 'react'
import { Link} from 'react-router-dom'
import '../../assets/styles.css'
import { Box,Typography} from "@mui/material";
export default function Github() {
    return (
        <div className="container" style= {{marginBottom: '44rem', }}>

        <Link to="https://github.com/ceyhunsahin" style = {{textDecoration: "none"}}> 
        <Typography variant= 'h3' >
        <span style = {{color: "#e51a59",
                        fontFamily:"Courant",
                        fontWeight: 800}}>
                        Ceyhun SAHIN  My </span> 
                        Github Page </Typography></Link>
            
        </div>
    )
}
