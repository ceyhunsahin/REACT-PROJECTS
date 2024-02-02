import React, { useEffect } from "react";

import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import { Container } from "@mui/material";
//import { styled } from '@mui/system';
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import { app, provider } from "../Firebase/firebase.utils";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../Firebase/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const meals = ["Breakfast", "Lunch", "Dinner", "Snack", "TeaTime"];

const cuisineType = ["american", "asian", "british", "caribbean", "central europe",
  "eastern europe", "french", "greek", "indian", "italian", "japanese", "korean", "kosher",
  "mediterranean", "mexican", "middle eastern", "nordic", "south american",
  "south east asian", "world",
];
const dishTypes = ["alcohol cocktail","biscuits and cookies","bread","cereals","condiments and sauces","desserts","drinks","egg","ice cream and custard","main course","pancake","pasta","pastry","pies and tarts","pizza","preps","preserve","salad","sandwiches","seafood","side dish","soup","special occasions","starter","sweets"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

const RecipeAdd = () => {
  const auth = getAuth();
  // const { user } = useAuth();
  const theme = useTheme();
  const [mealTime, setmealTime] = React.useState([]);
  const [cuisine, setCuisine] = React.useState([]);
  const [dishType, setDishType] = React.useState([]);

  const navigate = useNavigate();

  const handleChangeMeal = (event) => {
    const {
      target: { value },
    } = event;
    setmealTime(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeCuisine = (event) => {
    const {
      target: { value },
    } = event;
    setCuisine(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeDish = (event) => {
    const {
      target: { value },
    } = event;
    setDishType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/addrecipe");
      } else {
        navigate("/login");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    //we will design a recipe page with material UI
    // left side of the page will be 2 a dropdown a textfiled
    // middle of the page will be image upload button
    // right side of the page will be 2 a dropdown a textfiled

    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        pt={3}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Add Recipe
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: {
            xs: "flex",
            md: "flex",
            wrap:"nowrap",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          },
        }}
      >
        {/* Create dropdown Menu */}
        <FormControl sx={{mx : 5, width: 300 }}>
          <InputLabel id="select-label">MealType</InputLabel>
          <Select
            labelId="MealtypeId"
            id="mealType"
            multiple
            value={mealTime}
            onChange={handleChangeMeal}
            input={<OutlinedInput label="MealType" />}
            MenuProps={MenuProps}
          >
            {meals.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, mealTime, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mx : 5,width: 300 }}>
          <InputLabel id="cuisineTypeinput">Cuisine</InputLabel>
          <Select
            labelId="cuisineTypeId"
            id="cuisineType"
            multiple
            value={cuisine}
            onChange={handleChangeCuisine}
            input={<OutlinedInput label="cuisineType" />}
            MenuProps={MenuProps}
          >
            {cuisineType.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, cuisine, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mx : 5, width: 300 }}>
          <InputLabel id="dishTypeinput">Dish Type</InputLabel>
          <Select
            labelId="dishTypeId"
            id="dishType"
            multiple
            value={dishType}
            onChange={handleChangeDish}
            input={<OutlinedInput label="dishType" />}
            MenuProps={MenuProps}
          >
            {dishTypes.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, dishType, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: {
            xs: "flex",
            md: "flex",
            wrap:"nowrap",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          },
        }}
       
      >
        <TextField
          id="Ingredients"
          label="Ingredients"
          multiline
          rows={8}
          variant="outlined"
          sx={{ width: 500, mx : 5, my: 5 }}
          placeholder="Type ingredients here with commas and don't forget listing"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
         
          
        />
     <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload Image
      <VisuallyHiddenInput type="file" />
    </Button>
      </Box>
    </Container>
  );
};

export default RecipeAdd;
