 import "./cards.scss";
 import { useState, useEffect } from "react";
 import Stack from '@mui/material/Stack';
//import CustomIcons from "../pagination/pagination";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';

import Pagination from '@mui/material/Pagination';


export default function Cards({image , city, desc, name}) {

/*     const [isFlipped, setIsFlipped] = useState(false);

    const handleMouseOver = () => {
        setIsFlipped(true);
      };
    
      const handleMouseOut = () => {
        setIsFlipped(false);
      }; */

    const [isSelected, setSelected] = useState(true);
    const [showFullPage, setShowFullPage] = useState(true);

  

    const handleClick = () => {
        setSelected(!isSelected);
        setShowFullPage(!showFullPage);
    }
    const closedImage = () => {
        setSelected(!isSelected);
    }

    const [currentPage, setCurrentPage] = useState(1);

    const handleChange = (event, value) => {
        console.log(value)
        setCurrentPage(value);

    };

    

    const innerTheme = createTheme({
/*         palette: {
          secondary: {
            main: green[500],
          },
        }, */
        components: {
            MuiPagination: {
              styleOverrides: {
                // Name of the slot
                
                ul : 
                    ({ ownerState }) => ({
                        ...(ownerState.color === 'secondary' && {
                            backgroundColor: 'white',
                            /* color: 'green[500]', */
                          }),
                      }),
                
                },
            },

              },

      });
 


    return (
        /**
        |--------------------------------------------------
        | THIS is the card component which is used to display the cards,
        the card will display the image and the city
        when mouseover it shows description flipped backside.
        |--------------------------------------------------
        */
/*         <div className="cards" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className={`cards-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
            
                {!isFlipped && (

                <div className="cards-card-inner-card-front" >
                    <h3>{city}</h3>
                    <img className = "cards-card-inner-card-front-img-cls"  src={image} alt={city} />

                </div>)}
                {isFlipped && (

                    <div className="cards-card-inner-card-front">
                        <p>{desc}</p>
                    </div>)}
            </div>
  
        </div> */

        /**
        |--------------------------------------------------
        | THIS TIME i'll try to  choose the card with onClick, then the card will cover the page 
         and show pagination for images
        |--------------------------------------------------
        */
       
    <>

        <div className="cards" >
        {/* <div className="cards" onClick={handleClick} > */}
            <div className="cards-card-inner">
                {isSelected && (
                <div className="cards-card-inner-card-front" >
                    <h3>{city}</h3>
                    <img className = "cards-card-inner-card-front-img-cls"  src={image[currentPage-1]} alt={city} />
                    <Stack spacing={2}>
                        <ThemeProvider theme={innerTheme}>
                            <Pagination count={image.length} color="secondary" onChange={handleChange} />
                        </ThemeProvider>
                    </Stack>
                    {/* < CustomIcons images = {image}/> */}
                </div>)}
                

            </div>

        </div>
{/* 
        {!isSelected && (

        <div className="full-page-view-slayt">
            <img className = "full-page-view"  src={image[0]}  alt={city} onClick = {closedImage}/>
            <Pagination count={10} color="secondary" />
        </div>)} */}
    </>
    )
}
