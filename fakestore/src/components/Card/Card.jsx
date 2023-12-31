import * as React from 'react';


import { Box } from '@mui/material';
import {useState, useEffect, useContext} from 'react';

import{ CardItem} from '../CardItem/CardItem';
import axios from 'axios';
import DataContext from '../DataContext';


export default function RecipeReviewCard() {


  const [data, setData] = useState()

  //const [isSelect, setisSelected] = useState(true);


  const { urun, setUrun } = useContext(DataContext);

  const handleAddToUrun = (ali) => {
    console.log(ali)
    setUrun(currentUrun => [...currentUrun, ali]);
  };
/*   const handleRemoveFromUrun = (ali) => {
    setUrun(currentUrun => currentUrun.filter(ur=> ur === ali));
  } */
  const handleRemoveFromUrun = (name) => {
    const index = urun.findIndex(ur => ur === name);
    if (index !== -1){
        urun.splice(index, 1)
        setUrun([...urun]);
    
  }}


  useEffect (() => {

      axios.get("https://fakestoreapi.com/products")
      .then(res => setData(res.data))
  }, [])
 



  return (
    
    <Box sx = {{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-around',

    }}>
    <DataContext.Provider value={urun}>
    
   
      {data && data.map(item => (
        <CardItem key = {item.id} donne = {item} handleAddToUrun={handleAddToUrun} handleRemoveFromUrun={handleRemoveFromUrun}/>
        
        ))}
    </DataContext.Provider>
    
    </Box>

  );
}