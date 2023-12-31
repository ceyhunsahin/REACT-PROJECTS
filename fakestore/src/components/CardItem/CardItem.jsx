import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



export const CardItem = ({  donne , handleAddToUrun, handleRemoveFromUrun}) => {
  const name = donne.title;
  //const img = donne.image;


  const [afterSelect, setafterSelect] = useState(0);
  




  const handleIncrease = (resim) => {
    setafterSelect(afterSelect => afterSelect + 1);
    handleAddToUrun(resim);
  
  }
  

  const handleDecrease = (name) => {
    setafterSelect(afterSelect => afterSelect - 1 <=0 ? 0 : afterSelect - 1);
    handleRemoveFromUrun(name);
    }


  return (
    
        <Card sx={{
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        maxWidth: 300,
        maxHeight: 500,
        borderRadius: 1,
        scrollbarColor: 'rgba(0, 0, 0, 0.5)',
        scrollbarWidth: '2px',
        '&::-webkit-scrollbar': {
            width: 0,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        }}>

            <CardMedia
            component="img"
            height="194"
            image={donne.image}
            alt="Paella dish"
            />
            <CardContent sx = {{ display: "flex", flexDirection : "row",m:1, p:1}}>
                <Typography variant="body1" color="black">
                    {donne.title}
                </Typography>

                <Typography variant="body1" color="red" sx = {{mL:1, p:1}}>
                    {donne.price}$
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <Typography variant="body1" color="text.secondary">
                        {donne.category}
                </Typography>
        
                <IconButton
                    sx={{ marginLeft: 'auto' }}
                    size="medium"
                    aria-label="show more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    >
                    
                        <RemoveIcon onClick={()=>handleDecrease(name)}/>
                            <Badge badgeContent={afterSelect} color="primary"> 
                                {afterSelect >=1 ? 
                                    <AddShoppingCartIcon sx = {{color : "green"}}/>
                                    : 
                                    <AddShoppingCartIcon sx = {{color : "red"}}/>
                                }
                            </Badge>
                        <AddIcon onClick={() => handleIncrease(name)}/>    

                </IconButton>
            </CardActions>
        </Card>

  );
};