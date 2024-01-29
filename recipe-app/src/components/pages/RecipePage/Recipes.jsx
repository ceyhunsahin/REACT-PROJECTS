import React, { useState, useEffect } from "react";
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
import Chip from "@mui/material/Chip";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { getRecipes } from "../../util";
import { useLoaderData, useSearchParams, Link, useLocation} from "react-router-dom";
import DetailShareActions from "./DetailPages/DetailShareActions";

// loader.js
export function loader({ request }) {
  const urlParts = request.url?.split('?');

  


  if (urlParts?.length === 2) {
    const queryParams = urlParts[1].split('&');
    const params = {};


    queryParams.forEach(param => {
      const [key, value] = param.split('=');
      if (params[key]) {
        // If the parameter already exists, convert it to an array
        params[key] = Array.isArray(params[key]) ? [...params[key], ...value.split(',')] : [params[key], ...value.split(',')];
      } else {
        params[key] = value.split(',');
      }
    });

    console.log("queryPAramsssss", queryParams)

    const { q, mealType } = params;

    console.log("MAILTYPEEEEE", mealType);
    console.log("queryyyyyyyyy", q);

    if (mealType && q) {
      console.log("burdayiz demi");
      return getRecipes(q, Array.isArray(mealType) ? mealType : [mealType.join(',')]);
    } else if (q) {

      return getRecipes(q);
    } else if (mealType) {
      console.log("burda1")
      return getRecipes(null, Array.isArray(mealType) ? mealType : [mealType]);
    }
  } else if (urlParts?.length === 1 && urlParts[0].includes('q=')) {
    const query = urlParts[0].split('=')[1];
    return getRecipes(query);
  } else {
    return getRecipes();
  }
}
  



const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 120,
    },
  },
};

const meals = ["Breakfast", "Lunch", "Dinner", "Snack", "TeaTime"];
function getStyles(name, mealsName, theme) {
  return {
    fontWeight:
      mealsName.indexOf(meals) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#262B32" : "#fff",
  padding: theme.spacing(2),
  textAlign: "center",
  borderRadius: 10,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.info.dark, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.action.hover, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  border: "1px solid #e5e5e5",
  padding: theme.spacing(0, 2),
  transition: theme.transitions.create("width"),
  "&:focus": {
    width: "20ch",
    transition: theme.transitions.create("width"),
  },
  width: "60%",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Recipes() {
  const data = useLoaderData().hits;

  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [mealsName, setMealsName] = useState([]);


  


  function handleClick() {
    setLoading(false);
    setTimeout(() => setLoading(true), 1000);
  
    setSearchParams((prevSearchParams) => {
      const updatedSearchParams = {
        ...prevSearchParams,
        mealType: mealsName,
      };
  
      if (query && query !== "") {
        updatedSearchParams.q = query;
      } else {
        delete updatedSearchParams.q;
      }
  
      return updatedSearchParams;
    });
  }


  const theme = useTheme();
  

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMealsName(
      // On autofill we get a stringified value.
      typeof value === "string" ? null : value
    );

  };


  const handleSearchChange = (event) => {
    const {
      target: { value },
    } = event;
    setQuery(value);
    console.log("queryryryryryryr",query)

    }

  const extractIdFromUri=(uri) => {
    return uri.split('#recipe_').pop()
}  

  const location = useLocation();
  const searchParamsNew = new URLSearchParams(location.search);
  const queryFromParams = searchParamsNew.get('q');
  const mealTypeFromParams = searchParamsNew.getAll('mealType');
  const fbclid = searchParamsNew.get('fbclid');



  console.log("searchParamsNew",mealTypeFromParams);
  useEffect(() => {
    setQuery(queryFromParams || '');
    setMealsName(mealTypeFromParams );
  }, [location.search]);


  const handleDelete = (value) => {
    const updatedSelected = mealsName.filter((selectedValue) => selectedValue !== value);

    setMealsName(updatedSelected);
  };




  return (
    <Container >
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
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "q" }}
            onChange={handleSearchChange}
            value={query}
          />
        </Search>
        <Stack>
          {loading ? (
            <Box sx={{ "& button": { m: 1 } }}>
              <Button variant="outlined" size="medium" onClick={handleClick}>
                Search
              </Button>
            </Box>
          ) : (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          )}
        </Stack>

        <FormControl sx={{ s: 1, width: 300, height: -200 }}>
          <InputLabel id="demo-multiple-chip-label">Meals</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={mealsName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip  
                      label={value} 
                      key={value} 
                      color="secondary"
                      //variant="outlined"
                      onDelete={(e) => handleDelete(value)} 
                      onClick={(e) => e.stopPropagation()}  
                      onMouseDown={(e) => e.stopPropagation()} 
                      sx={{ mr: 1, mb: 1, "&:hover": { backgroundColor: "#e0e0e0" } }}
                    
                      
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {meals.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, mealsName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
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
         {data.map((item) => (
          <Card sx={{ width: 345, height: 350, marginTop: 3 }} key={extractIdFromUri(item.recipe.uri)}>
            <Link
              to={extractIdFromUri(`${item.recipe.uri}`)}
              style={{ textDecoration: "none", color: "inherit" }}
              state={{
                search: `${searchParams.toString()}`,
              }}
            >
              <CardMedia sx={{ height: 180 }} image={item.recipe.image} title={item.recipe.label} />
              <CardContent sx={{ height: 80 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {item.recipe.label}
                </Typography>
              </CardContent>
            </Link>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <DetailShareActions id = {extractIdFromUri(`${item.recipe.uri}`)} />
              <Button size="small">Learn More</Button>
            </Box>
          </Card>
        ))}

          

        </Stack>
    </Container>
  );
}

export default Recipes;
