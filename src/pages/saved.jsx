import React, { useState, useEffect } from "react";
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
import Navbar from "./navbar";
import { domain } from "../App";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer() {
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState("https://via.placeholder.com/500");

  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = React.useState(false);

  // create an array state variable to store the saved recipe ids
  const [savedRecipeArray_id, setSavedRecipeArray_id] = useState([]);

  // add a recipe to the savedRecipeArray_id
  const addRecipe_id = (recipeId) => {
    setSavedRecipeArray_id([...savedRecipeArray_id, recipeId]);
  };

  // remove a recipe from the savedRecipeArray_id
  const removeRecipe_id = (recipeId) => {
    setSavedRecipeArray_id(savedRecipeArray_id.filter((_, i) => i !== recipeId));
  };

  if (localStorage.getItem("user") == null) {
    window.location.href = `${domain}/signin`;
  }

  const theme = useTheme();
  
  const [query, setQuery] = useState("")

  const navigate = useNavigate();

  const recipe = (recipeId) => {
    const url = `/recipe?_id=${recipeId}`
    navigate(url);
  };

  // Call fetchRecipes when the component mounts
  useEffect(() => {

    const fetchRecipe_byId = async (recipeId) => {
      try {
        // Define the endpoint URL
        const url = `https://dishcover-api.onrender.com/recipes/getRecipeByID/${recipeId}`; // Update the URL based on your API endpoint

        // Make the API call using fetch()
        const response = await fetch(url, {
          method: "GET", // Use GET method to fetch recipe data by id
          headers: {
            "Content-Type": "application/json"
          }
        });

        // Check if the response is successful
        if (response.ok) {
          const recipeData = await response.json();

          // Handle the recipe data as needed
          return recipeData;
        } else {
          console.error("API call failed with status:", response.status);
          // Handle the API error as needed
          throw new Error("API call failed with status: " + response.status);
        }
      } catch (error) {
        console.error("API call failed with error:", error);
        // Handle the API error as needed
        throw error;
      }

    };

    // Get the user from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.error("Failed to retrieve user from local storage.");
      return;
    }

    // Get the saved recipes from the user
    const savedRecipes = user.savedRecipes;
    setSavedRecipeArray_id(savedRecipes);

    // Use Promise.all to fetch all recipe data by id concurrently
    Promise.all(savedRecipes && savedRecipes.map(recipeId => fetchRecipe_byId(recipeId)))
      .then(recipesData => {
        // Do something with the fetched recipe data, e.g., set it to state
        setRecipes(recipesData);
      })
      .catch(error => {
        console.error("Failed to fetch recipe data for some recipes", error);
      });
      

    setIsLoading(false);

  }, []);

  const saveRecipe = async (username, id) => {
    try {
      // Define the endpoint URL
      const url = "https://dishcover-api.onrender.com/api/user/saveRecipe";

      // Create the request body JSON object
      const requestBody = {
        username: username,
        _id: id
      };

      // Make the API call using fetch()
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        // Handle the API response data as needed
      } else {
        console.error("API call failed with status:", response.status);
        // Handle the API error as needed
        throw new Error("API call failed with status: " + response.status);
      }
    } catch (error) {
      console.error("API call failed with error:", error);
      // Handle the API error as needed
      throw error;
    }
  };

  const unsaveRecipe = async (username, id) => {
    try {
      // Define the endpoint URL
      const url = "https://dishcover-api.onrender.com/api/user/removeSavedRecipe";

      // Create the request body JSON object
      const requestBody = {
        username: username,
        _id: id
      };
      // Make the API call using fetch()
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        // Handle the API response data as needed
      } else {
        console.error("API call failed with status:", response.status);
        // Handle the API error as needed
        throw new Error("API call failed with status: " + response.status);
      }
    } catch (error) {
      console.error("API call failed with error:", error);
      // Handle the API error as needed
      throw error;
    }
  };

  const handleSavedClick = async (recipeId) => {
    // get user from local storage
    const user_h = JSON.parse(localStorage.getItem("user"));
    const savedRecipes_h = user_h.savedRecipes;
    const username_h = user_h.username;

    // check if the recipeID is already saved in savedRecipes_h
    if (!savedRecipes_h.includes(recipeId)) {
      // if not then add to the list
      savedRecipes_h.push(recipeId);
      // update the user in the local storage
      localStorage.setItem("user", JSON.stringify(user_h));
      // update the savedRecipes state
      setSavedRecipeArray_id(savedRecipes_h);

      // update the user in the database
      await saveRecipe(username_h, recipeId);
    }
    else {
      // if already saved then remove from the list
      const index = savedRecipes_h.indexOf(recipeId);
      savedRecipes_h.splice(index, 1);

      // update the user in the local storage
      localStorage.setItem("user", JSON.stringify(user_h));
      // update the savedRecipes state
      setSavedRecipeArray_id(savedRecipes_h);

      // update the user in the database
      await unsaveRecipe(username_h, recipeId);
    }
  };

  const handleShareClick = () => {
    // Copy text to clipboard
    navigator.clipboard.writeText(recipe.recipeURL)
      .then(() => {
        alert("Recipe URL copied to clipboard!")
        // You can show a success message or perform other actions here
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
        // You can show an error message or perform other actions here
      });
  };
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  // Check if recipe object is empty
  

  const [showImage, setShowImage] = useState(false);
  const dashboard = (
    <div style={{
      minHeight: height,
      minWidth: width*0.9,
      background: "linear-gradient(90deg, #c197f7 20%,#f2d2c2 90%)",
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
            <DrawerHeader />
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {isLoading ? (
                <img class="rotate" src={process.env.PUBLIC_URL + '/load2.png'} alt="loading" />
              ) : (
                <main>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      autoFocus
                      align={"Center"}
                      style={{ color: "white" }}
                      id="recipeName"
                      helperText="Search Recipe by name"
                      variant="outlined"
                      onChange={(event) => {
                        setQuery(event.target.value);
                      }}
                    />
                  <motion.div
                    className="container text-center  bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Grid container spacing={4} sx={{ py: 3 }}>
                      
                      {recipes.filter(post => {
                        if (query === '') {
                            return post;
                        }
                        else if (post.recipeName.toLowerCase().includes(query.toLowerCase())) {
                            return post;
                        }
                    })
                        .map((card) => (
                          <Grid item key={card} xs={12} sm={6} md={4}>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="item"
                              transition={{ duration: 0.2 }}
                              key={card}
                            >
                              {/* <Card sx={{ maxWidth: 345 }} onClick={ 
                                () => recipe(card._id)
                              }> */}
                              <Card sx={{ maxWidth: 345, height: 400 }}>
                                <CardMedia
                                  component="img"
                                  height="60%"
                                  image={card.image}
                                  alt="Paella dish"
                                  onClick={() => recipe(card._id)}
                                />
                                <CardHeader
                                  height="20%"

                                  title={
                                    <div style={{ display: 'grid', alignItems: 'center', height: '100%', flex: 1 }}>
                                      <span
                                        style={{
                                          minWidth: 0,
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          fontSize: '1rem',
                                          lineHeight: '1.2',
                                        }}
                                      >
                                        {card.recipeName}
                                      </span>
                                    </div>
                                  }
                                  subheader={card.contributorName}
                                />

                                <CardActions disableSpacing>
                                  <IconButton
                                    aria-label="add to favorites"
                                    style={{ color: savedRecipeArray_id && savedRecipeArray_id.includes(card._id) ? "#f00a81" : "grey" }}
                                    onClick={(event) => {
                                      handleSavedClick(card._id);
                                    }}
                                  >
                                    <FavoriteIcon />
                                  </IconButton>
                                  <IconButton aria-label="share" onClick={handleShareClick}>
                                    <ShareIcon />
                                  </IconButton>
                                  <IconButton aria-label="share" onClick={() => recipe(card._id)
                                  }>
                                    <OpenInNewIcon />
                                  </IconButton>
                                </CardActions>
                              </Card>
                            </motion.div>
                          </Grid>
                        ))}
                    </Grid>
                  </motion.div>
                </main>
              )}
            </ThemeProvider>
          </Box>
        </Container>
      </Box>
    </div>
  )
  // if already logged in
  if (JSON.parse(localStorage.getItem('user') !== null)) {
    return dashboard
  }
  else {
    window.location.href = `${domain}/signin`
  }
}