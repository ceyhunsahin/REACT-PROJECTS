import { Box, Stack, Typography, Button } from "@mui/material";
import React from "react";
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import '../../assets/styles.css'
import { Link } from "react-router-dom";
import { StyledNavLink } from "../Navbar/styleNavbar";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const Home = () => {
  return (

      <div
        style={{
          width: "100%",
          height: "100vh", // Full viewport height
        }}
      >
        
          <Box  sx={{
                    width: "100%",
                    height: "100vh",
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://picsum.photos/1600/900")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",

                  }}>
          <Stack >
              <Typography variant="h2" 
                  sx={{ 
                        color: "#e51a59",
                        fontFamily:"Courant",
                        fontWeight: 800,
                        letterSpacing: ".3rem",
                        textDecoration: "none",
                        mt:5

                        }}>
                CLARUSWAY RECIPE APP
              </Typography>
            </Stack>
            <Stack
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          height: "60vh",
          textAlign: "center",
          mx:5
        }}
      >
        <Typography variant="h2" component="div"
          sx={{
            color: "#ffffff", // Set your desired text color
            fontFamily: "Courant",
            fontWeight: 700,
            letterSpacing: ".2rem",
            textDecoration: "none",
          }}>
          Welcome to Tasty Delights!
        </Typography>
        <Typography variant="h3" color="text.secondary" 
            sx = {{color: "#ffffff",
            fontFamily: "Courant",
            fontWeight: 400 }}
            >
          Your culinary journey starts here.
        </Typography>
        <Typography variant="h4" 
         sx = {{color: "#ffffff",
            fontFamily: "Courant",
            fontWeight: 300, ml : 15}}>
          Explore a world of diverse and delectable recipes crafted for food
          enthusiasts like you. Whether you're a seasoned chef or just starting
          out, we have something special for every taste bud.
        </Typography>
        <Link to="/recipes" style={{ textDecoration: "none", color: "inherit" }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{ mt: 4 }}
          >
            Discover Recipes
          </Button>
        </Link>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Typography variant="h5" gutterBottom
           sx = {{color: "#ffffff",
            fontFamily: "Courant",
            fontWeight: 300 }}>
            Join our community for exclusive recipes, tips, and more!
          </Typography>
          <StyledNavLink to ="/signup">
            <ColorButton variant="contained">
              Sign Up Now
            </ColorButton>
          </StyledNavLink>
        </Box>
      </Stack>
          </Box>
        
      </div>

  );
};

export default Home;
