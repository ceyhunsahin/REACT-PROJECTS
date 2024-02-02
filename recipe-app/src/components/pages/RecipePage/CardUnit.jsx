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
import { Link, redirect, useNavigate} from "react-router-dom";
import DetailShareActions from "./DetailPages/DetailShareActions";
import { getAuth } from 'firebase/auth';
import {onAuthStateChanged} from "firebase/auth";

export default function CardUnit ({data, searchParams}) {





    
    

    return (

      <Stack
      direction={{ xs: "column", sm: "row" }}

      justifyContent="space-between"
      overflow='hidden'
      flexWrap= "wrap"
      mt={4}
      mb={3}
      sx={{
      border: '1px solid #ddd', 
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

      </Stack>
    )}
  
  const DelayedCard = ({ item , searchParams}) => {
    const [user, setUser] = useState(null);
    const extractIdFromUri=(uri) => {
        return uri.split('#recipe_').pop()
    }  
    const navigate = useNavigate();
    useEffect(() => {
      const auth = getAuth();
      
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      // useEffect içinde temizlik işlemi
      return () => unsubscribe();
    }, [user]);

    const handleLearnClick = () => {
      if (user) {
        navigate(`/recipeDetail/${extractIdFromUri(item.uri)}`);
      } else {

      navigate("/login");
      }
 
   }

  return (
  <Card sx={{ width: 345, height: 350, marginTop: 3 }} key={extractIdFromUri(item.recipe.uri)}>
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
    <Button size="small" onClick = {handleLearnClick}>Learn More</Button>
  </Box>
</Card>
  )}