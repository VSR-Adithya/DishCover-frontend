import React, { useState, useEffect } from "react";
import "../App.css";
import Maindash from "./maindash";
import Healthdash from "./healthdash";
import Switch from '@mui/material/Switch';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../App.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { red, pink } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import FormControlLabel from '@mui/material/FormControlLabel';

import Navbar from "./navbar";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#001e3c',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
export default function MiniDrawer() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const theme = useTheme();

  const width = window.innerWidth;
  const height = window.innerHeight;
  const dash = (
    <>
    <div style={{
      minHeight: height,
      minWidth: width * 0.9,
      background: checked?"linear-gradient(90deg, #63e0ab 20%, #f4f6c6 50%)":"linear-gradient(90deg,  #e39fb7 25%, #f4f6c6 50%)",
    }}>
      <Navbar />
      <Box
        sx={{ display: "flex" }}
        style={{
        }}
        px={5}
      >
        <Container>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

            <ThemeProvider theme={theme}>
              <CssBaseline />


      <DrawerHeader />
      
        <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked={false} />}
        label="Healthy Recipes"
        onChange={handleChange}
      />
      {checked ? (<Healthdash />) : (<Maindash />)}        
      </ThemeProvider>
          </Box>
        </Container>
      </Box>
    </div>
    </>
  );

  // if already logged in
  if (JSON.parse(localStorage.getItem('user') !== null)) {
    return dash
  }
  else {
    window.location.href = '/signin'
  }
}

