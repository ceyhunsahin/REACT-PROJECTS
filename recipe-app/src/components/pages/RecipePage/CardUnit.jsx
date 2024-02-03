import { useState, useEffect } from "react";
import { getRecipes } from "../../util";
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import { Link, redirect, useNavigate ,useLocation} from "react-router-dom";
import DetailShareActions from "./DetailPages/DetailShareActions";
import { getAuth } from 'firebase/auth';
import {onAuthStateChanged} from "firebase/auth";

export default function CardUnit ({data, searchParams}) {





    
    

    return (

      <Box

        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          overflow:'hidden',
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "10px",
          margin: "10px",
          borderRadius: '4px',
          padding: '10px', 
          backgroundColor: '#F5F3F8',
        }}
      >

      <>
      {data.map((item,index) => (
        
        <DelayedCard key = {index} item={item} searchParams={searchParams}/>
      
      ))}
      </>

      </Box>
    )}
  
  const DelayedCard = ({ item , searchParams}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    console.log("location",location)
    const extractIdFromUri=(uri) => {
        return uri.split('#recipe_').pop()
    }  
    const navigate = useNavigate();
    useEffect(() => {
      const auth = getAuth();
     
      
      const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false when user state is determined

      // Save user data to localStorage
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  
      // useEffect içinde temizlik işlemi
      return () => unsubscribe();
    }, []);


    console.log("useruser",user)

 
   

  return (
  <Card sx={{ width: 325, height: 350, margin: 3,overflowY: 'auto' }} key={extractIdFromUri(item.recipe.uri)}>
  <Link
    to={extractIdFromUri(`${item.recipe.uri}`)}
    style={{ textDecoration: "none", color: "inherit" }}
    state={{
      search: `${searchParams.toString()}`,
    }}
  > {item ? (
    <CardMedia sx={{ height: 180 }} image={item.recipe.image} title={item.recipe.label} />
     
  ) : (
    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
  )

  }
   
    <CardContent sx={{ height: 80 }}>
      <Typography gutterBottom variant="h5" component="div">
        {item.recipe.label}
      </Typography>
    </CardContent>
  </Link>
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
    <DetailShareActions id = {extractIdFromUri(`${item.recipe.uri}`)} />
    {user ? (
      <Link to={`${extractIdFromUri(item.recipe.uri)}`} 
      state={{
      search: `${searchParams.toString()}`,
    }}>
        <Button size="small">Learn More</Button>
      </Link>
    )
    :
    (navigate('/login'))
    }
   
  </Box>
</Card>
  )}