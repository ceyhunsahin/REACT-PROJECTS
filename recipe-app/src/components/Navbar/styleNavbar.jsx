import { Typography, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  // Your styles here
  textDecoration: 'none',
  color:"#e51a59",
  textDecoration:'none',
  marginLeft: theme.spacing(5),

  marginRight: theme.spacing(5),

}));



export const StyledTypo = styled(Typography)(({ theme }) => ({
    // Your styles here
    fontFamily: "Courant",
    fontWeight: 500,
    transition: 'color 0.2s ease-in-out', // Add a transition property for smoother effect
    '&:hover': {
      color: theme.palette.secondary.light,
    },
    '&:visited': {
      color: theme.palette.info.light,
    },
    '&:active': {
      color: theme.palette.success.light,
    },
   
  }));


export const StyledLittleTypo = styled(Typography)(({ theme }) => ({
    // Your styles here
    fontFamily: "Courant",
    fontWeight: 300,
    textDecoration: 'none',
    color:"#e51a59",
    transition: 'color 0.2s ease-in-out', // Add a transition property for smoother effect
    '&:hover': {
      color: theme.palette.secondary.light,
    },
    '&:visited': {
      color: theme.palette.info.light,
    },
    '&:active': {
      color: theme.palette.success.light,
    },
  }));