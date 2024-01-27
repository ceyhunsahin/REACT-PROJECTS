import React, {useState} from "react";
import { useParams, useLoaderData, useLocation } from "react-router-dom";
import { getRecipeDetails } from "../../util";
import { Typography } from "@mui/material";
import { Container } from "@mui/joy";
import { Stack, Box } from "@mui/system";


export function loader({ params }) {
  return getRecipeDetails(params.id);
  //return null
}

export default function RecipeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const data = useLoaderData();
  const [showAllDigest, setShowAllDigest] = useState(false);
  const [showAllingredients, setShowAllIngredients] = useState(false)

  const handleShowAllDigest = (e) => {
    setShowAllDigest(true);
  };
  const handleShowAllIngredients = (e) => {
    setShowAllIngredients(true);
  };

  const visibleItemsDigest = showAllDigest ? data[0].recipe.digest : data[0].recipe.digest.slice(0, 5);
  const visibleItemsIngredients = showAllingredients? data[0].recipe.ingredientLines : data[0].recipe.ingredientLines.slice(0, 5);

  return (
    <>
      <Typography variant="h4" fontWeight='bold' fontSize={'2.5rem'} align="center">
        {data[0].recipe.label}
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={3}
        pt={3}
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
        <Box>
          {visibleItemsDigest.map((line, index) => (
            <Typography key={line} sx={300}>
              {index} - {line.label} / Total : {Math.trunc(line.total)}
            </Typography>
          ))}
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
        <Box>
          {visibleItemsIngredients.map((line, index) => (
            <Typography key={line}>
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
        </Box>
      </Stack>
    </>
  );
}
