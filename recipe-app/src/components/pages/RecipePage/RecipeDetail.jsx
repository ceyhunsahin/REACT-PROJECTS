import React, {useState} from "react";
import { useParams, useLoaderData, useLocation, useNavigate, redirect,Link } from "react-router-dom";
import { getRecipeDetails,extractParamsFromString } from "../../util";
import { Typography } from "@mui/material";
import { Container } from "@mui/joy";
import { Stack, Box } from "@mui/system";
import BackArrow from "./BackArrow";



export function loader({ params }) {
  return getRecipeDetails(params.id);
  //return null
}

export default function RecipeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const data = useLoaderData();
  console.log('datadatadatdtadtadtatd', location)
  const [showAllDigest, setShowAllDigest] = useState(false);
  const [showAllingredients, setShowAllIngredients] = useState(false)

  const handleShowAllDigest = () => {
    setShowAllDigest(!showAllDigest);
  };
  const handleShowAllIngredients = () => {
    setShowAllIngredients(!showAllingredients);
  };
  console.log("showAllDigest",showAllDigest)
  const visibleItemsDigest = showAllDigest ? data[0].recipe.digest : data[0].recipe.digest.slice(0, 5);
 
  const visibleItemsIngredients = showAllingredients? data[0].recipe.ingredientLines : data[0].recipe.ingredientLines.slice(0, 5);

  const search = location.state?.search ;
  console.log("search detail",search)

  const newSearch = location.pathname.split('/')[2];
  
  const extractedParams = newSearch;

  console.log("extractedParams extractedParams ",extractedParams.mealType)

  return (
    <>
        <Link
        to={search === '' ? "/recipes" : `../?${search}`}
        relative="path"
        style = {{ textDecoration: "none", color: "inherit", fontWeight: "bold", fontSize: "20px" }}
      >
        Back to Recipes
      </Link>
      <Typography variant="h4" fontWeight='bold' fontSize={'2.5rem'} align="center">
        {data[0].recipe.label}
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
        pt={3}
        mx={5}
        my={5}
        divider={
          <Box
            component="hr"
            sx={{
              border: (theme) =>
                `1px solid ${
                  theme.palette.mode === "dark" ? "#262B32" : "#fff"
                }`,
            }}
          />
        }
      >
        <Box  sx ={{ display: "flex",flexDirection: "column", flexWrap: "wrap", gap: 0.5,  width:'auto',overflow: 'hidden'  }}>
          {visibleItemsDigest.map((line, index) => (
            <Typography key={line.label} >
              {index} - {line.label} / Total : {Math.trunc(line.total)} Cal
            </Typography>
            
          ))}
          {showAllDigest && (
            <Typography
                variant="body1"
                component="div"
                sx={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                onClick={handleShowAllDigest}
                >
            ...No Need 
            </Typography>
          )}

          {!showAllDigest && (
            <Typography
                variant="body1"
                component="div"
                sx={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                onClick={handleShowAllDigest}
                >
            ...More Info
            </Typography>
          )}
        </Box>
        <Box>
          <img src={data[0].recipe.image} alt={data[0].recipe.label} />
        </Box>
        <Box sx ={{ display: "flex", flexDirection: "column",flexWrap: "wrap", gap: 0.5, width:'40%',overflow: 'hidden' }}>
          {visibleItemsIngredients.map((line, index) => (
            <Typography key={index}>
              {index} - {line}
            </Typography>
          ))}
          {!showAllingredients && (
            <Typography
                variant="body1"
                component="div"
                sx={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                onClick={handleShowAllIngredients}
                >
            ...More Info
            </Typography>
          )}
          {showAllingredients && (
            <Typography
                variant="body1"
                component="div"
                sx={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                onClick={handleShowAllIngredients}
                >
            ...No Need 
            </Typography>
          )}
        </Box>
      </Stack>
    </>
  );
}
