import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { SvgIcon } from "@mui/material";
import { styled } from '@mui/system';
import { NavLink, Link } from "react-router-dom";
import { useId } from "react";

const pages = ["Recipes", "About", "Github"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const active={
  mr: 2,
  display: { xs: "flex", md: "none" },
  flexGrow: 1,
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".2rem",
  color: "#e51a59",
  textDecoration: "none",
  cursor: 'pointer',
   
    "&:hover": {
     
      color: "#e51a59",
      transition: "all 0.2s ease-in-out"

    },
    "&:visited": {
      color: "#e51a59",
    },
    
    
}
const notactive={
 
  cursor: 'pointer',
   
    "&:hover": {
     
      color: "#e51a59",
      transition: "all 0.2s ease-in-out"

    },
    "&:visited": {
      color: "#e51a59",
    },
    
    
}



function Navbar() {
  const id = useId();
  console.log(id)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
   
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
   
  };

  const handleHomeMenu = () => {
    <Link to="/" >Home</Link>;
  }

  const handleLinkMenu = (e) => {
    console.log(e.currentTarget.value)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SvgIcon sx={{ display: { xs: "none", md: "flex" }, xl: 1 }}>
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="190.000000pt"
              height="190.000000pt"
              viewBox="00 0 50.000000 1.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
                fill="#e51a59"
                stroke="none"
              >
                <path
                  d="M130 511 c0 -6 3 -12 8 -15 4 -2 39 -54 77 -115 l69 -111 74 0 74 0
                    -14 23 c-8 12 -43 68 -78 125 l-63 102 -74 0 c-40 0 -73 -4 -73 -9z"
                />
                <path
                  d="M33 452 c-21 -7 -20 -11 35 -94 l56 -88 58 0 57 0 -61 95 c-56 88
                    -63 95 -92 94 -17 -1 -41 -4 -53 -7z"
                />

                <path
                  d="M68 163 c-55 -84 -56 -88 -35 -95 12 -3 36 -6 53 -7 29 -1 36 6 92
                    94 l61 95 -57 0 -58 0 -56 -87z"
                />
                <path
                  d="M221 148 c-35 -57 -71 -113 -79 -125 l-14 -23 74 0 75 0 63 103 c35
                    56 70 112 78 125 l14 22 -74 0 -74 0 -63 -102z"
                />
              </g>
            </svg>
          </SvgIcon>
          
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#e51a59",
                textDecoration: "none",
                cursor: 'pointer',
               
                "&:hover": {
                 
                  color: "white",
                  transition: "all 0.2s ease-in-out"

                },
                "&:visited": {
                  color: "red",
                },
                "&:active": {
                  color: "orange",
                },
                "&:focus": {
                  color: "orange",
                },
              }}
              onClick = {handleHomeMenu}
              
            >
               CLARUSWAY
            </Typography>
        
          

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#e51a59"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                <NavLink key={`${page }-${id}`} onClick={handleCloseNavMenu} to = {page}>
                  <Typography 
                  sx = {{
                    
                    cursor: 'pointer',
               
                "&:hover": {
                 
                  color: "white",
                  transition: "all 0.2s ease-in-out"

                },
                "&:visited": {
                  color: "red",
                },
                "&:active": {
                  color: "orange",
                },
                  }} textAlign="center">
                  
                  
                  {page}
                  </Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SvgIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="190.000000pt"
              height="190.000000pt"
              viewBox="00 0 60.000000 1.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
                fill="#e51a59"
                stroke="none"
              >
                <path
                  d="M130 511 c0 -6 3 -12 8 -15 4 -2 39 -54 77 -115 l69 -111 74 0 74 0
                    -14 23 c-8 12 -43 68 -78 125 l-63 102 -74 0 c-40 0 -73 -4 -73 -9z"
                />
                <path
                  d="M33 452 c-21 -7 -20 -11 35 -94 l56 -88 58 0 57 0 -61 95 c-56 88
                    -63 95 -92 94 -17 -1 -41 -4 -53 -7z"
                />

                <path
                  d="M68 163 c-55 -84 -56 -88 -35 -95 12 -3 36 -6 53 -7 29 -1 36 6 92
                    94 l61 95 -57 0 -58 0 -56 -87z"
                />
                <path
                  d="M221 148 c-35 -57 -71 -113 -79 -125 l-14 -23 74 0 75 0 63 103 c35
                    56 70 112 78 125 l14 22 -74 0 -74 0 -63 -102z"
                />
              </g>
            </svg>
          </SvgIcon>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "#e51a59",
              textDecoration: "none",
              cursor: 'pointer',
               
                "&:hover": {
                 
                  color: "#e51a59",
                  transition: "all 0.2s ease-in-out"

                },
                "&:visited": {
                  color: "#e51a59",
                },
                
                
            }}
          >
            CLARUSWAY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" },
           }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick= {handleLinkMenu}
                sx={{ my: 2, color: "white", display: "block",
                 }}
              >
                 <NavLink 
                 className={({ isActive }) =>
                isActive ? "active" : "notactive"
              }
           key={`${page }-${id}`} onClick={handleCloseNavMenu} to = {page}>{page}</NavLink>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;