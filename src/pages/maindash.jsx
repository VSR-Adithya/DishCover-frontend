import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../App.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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

export default function Maindash() {
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState("https://via.placeholder.com/500");

  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = React.useState(false);

  // create an array state variable to store the saved recipe ids
  const [savedRecipeArray_id, setSavedRecipeArray_id] = useState([]);

  if (localStorage.getItem("user") == null) {
    window.location.href = `${domain}/signin`;
  }

  const theme = useTheme();

  const navigate = useNavigate();

  const recipe = (recipeId) => {
    const url = `/recipe?_id=${recipeId}`;
    navigate(url);
  };
  //  filter state variables
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [count, setCount] = useState(21);
  const [maxCalories, setMaxCalories] = useState(1000000);
  const [minCalories, setMinCalories] = useState(0);

  let searchParams = {
    recipeName: "",
    includedIngredients: [],
    excludedIngredients: [],
    course: "",
    cuisine: "",
    count: count,
    maxCalories: maxCalories,
    minCalories: minCalories,
    maxSodium: null,
    maxSugar: null,
    maxTotalFat: null,
    maxCarbohydrates: null,
    maxSaturatedFat: null,
  };

  // Call fetchRecipes when the component mounts
  useEffect(() => {
    fetchRecipes(searchParams);

    const user_d = JSON.parse(localStorage.getItem("user"));
    setSavedRecipeArray_id(user_d.savedRecipes);
  }, []);

  // Function to handle "Search" button click
  const handleSearch = async () => {
    fetchRecipes(searchParams);
  };

  // Function to handle API request
  const fetchRecipes = async (sp) => {
    try {
      // Send a POST request to the server with the search parameters
      const response = await fetch("https://dishcover-api.onrender.com/recipes/getRecipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sp),
      });
      setTimeout(() => {
        setIsLoading(false);
        setImage(
          "https://cdn.dribbble.com/users/2417352/screenshots/17754676/media/d0b4c1f3ee3a0555f565e273e4294798.png?compress=1&resize=1000x750&vertical=top"
        );
      }, 0);
      // Get the JSON response from the server and update state with the recipes
      const recipes = await response.json();
      setRecipes(recipes); // Update state with the fetched recipes
    } catch (error) {
      console.error(error);
    }
  };

  const saveRecipe = async (username, id) => {
    try {
      // Define the endpoint URL
      const url = "https://dishcover-api.onrender.com/api/user/saveRecipe";

      // Create the request body JSON object
      const requestBody = {
        username: username,
        _id: id,
      };

      // Make the API call using fetch()
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
    // Define the endpoint URL
    const url = "https://dishcover-api.onrender.com/api/user/removeSavedRecipe";

    // Create the request body JSON object
    const requestBody = {
      username: username,
      _id: id,
    };

    // Make the API call using fetch()
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
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
  };

  const [including_ingredients, setIncluding_ingredients] = useState("");
  const [excluding_ingredients, setExcluding_ingredients] = useState("");
  const [including_ingredients_list, setIncluding_ingredients_list] = useState(
    []
  );
  const [excluding_ingredients_list, setExcluding_ingredients_list] = useState(
    []
  );

  // adding and removing ingredients
  const addIncluding_ingredients_list = () => {
    // check if the value is not empty and not already in the list
    if (
      including_ingredients !== "" &&
      !including_ingredients_list.includes(including_ingredients)
    ) {
      // if not empty then add to the list
      setIncluding_ingredients_list([
        ...including_ingredients_list,
        including_ingredients,
      ]);
    }
  };
  const addExcluding_ingredients_list = () => {
    // check if the value is not empty and not already in the list
    if (
      excluding_ingredients !== "" &&
      !excluding_ingredients_list.includes(excluding_ingredients)
    ) {
      // if not empty then add to the list
      setExcluding_ingredients_list([
        ...excluding_ingredients_list,
        excluding_ingredients,
      ]);
    }
  };

  const removeIncluding_ingredients_list = (index) => {
    const newIngredients = [...including_ingredients_list];
    newIngredients.splice(index, 1);
    setIncluding_ingredients_list(newIngredients);
  };
  const removeExcluding_ingredients_list = (index) => {
    const newIngredients = [...excluding_ingredients_list];
    newIngredients.splice(index, 1);
    setExcluding_ingredients_list(newIngredients);
  };

  const callquery = () => {
    // set the search parameters
    searchParams.recipeName = name === null ? "" : name;
    searchParams.includedIngredients =
      including_ingredients_list === null ? [] : including_ingredients_list;
    searchParams.excludedIngredients =
      excluding_ingredients_list === null ? [] : excluding_ingredients_list;
    searchParams.course = course === null ? "" : course;
    searchParams.cuisine = cuisine === null ? "" : cuisine;
    searchParams.count = count === null ? 21 * 2 : count;
    searchParams.minCalories = count === null ? 0 : minCalories;
    searchParams.maxCalories = count === null ? 1000000 : maxCalories;
    searchParams.maxSodium = 10000000;
    searchParams.maxSugar = 10000000;
    searchParams.maxTotalFat = 10000000;
    searchParams.maxCarbohydrates = 10000000;
    searchParams.maxSaturatedFat = 10000000;

    // call the search function
    handleSearch();
  };
  const [filter, setFilter] = useState("MORE FILTERS");
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (expanded) {
      setFilter("MORE FILTERS");
    } else {
      setFilter("NO FILTERS");
    }
  };

  const increase_count = () => {
    setCount(count + 21);
    callquery();
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
    } else {
      // if already saved then remove from the list
      const index = savedRecipes_h.indexOf(recipeId);
      if (index > -1) {
        savedRecipes_h.splice(index, 1);
      }

      // update the user in the local storage
      localStorage.setItem("user", JSON.stringify(user_h));
      // update the savedRecipes state
      setSavedRecipeArray_id(savedRecipes_h);
      // update the user in the database
      await unsaveRecipe(username_h, recipeId);
    }
  };

  const handleShareClick = (url) => {
    // Copy text to clipboard
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Recipe URL copied to clipboard!");
        // You can show a success message or perform other actions here
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
        // You can show an error message or perform other actions here
      });
  };
  function Crop(props) {
    const { sx, ...other } = props;
    return (
      <Typography
        sx={{
          fontSize: "11vw", // responsive font size based on viewport width
          fontWeight: "bold",
          textAlign: "center",
          backgroundImage: `url("https://images.prestigeonline.com/wp-content/uploads/sites/6/2021/12/21124704/sam-moqadam-yxzsajytop4-unsplash-scaled-1-1-1275x900.jpeg")`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100vw", // responsive background size based on viewport width
          color: "transparent",
          backgroundClip: "text",
          webkitBackgroundClip: "text",
        }}
        {...other}
      />
    );
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  const handleIncludedIngredient = (ingredient) => {
    const updatedList = including_ingredients_list.filter(
      (item) => item !== ingredient
    );
    setIncluding_ingredients_list(updatedList);
  };
  const handleExcludedIngredient = (ingredient) => {
    const updatedList = excluding_ingredients_list.filter(
      (item) => item !== ingredient
    );
    setExcluding_ingredients_list(updatedList);
  };

  const [showImage, setShowImage] = useState(false);
  return (
    <>
      <Crop>DishCover!</Crop>
      {isLoading ? (
        <img
          class="rotate"
          src={process.env.PUBLIC_URL + "/load2.png"}
          alt="loading"
        />
      ) : (
        <main>
          <Box
            noValidate
            sx={{
              display: "grid",
              mt: 1,
            }}
          >
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
                setName(event.target.value);
              }}
            />
            <Container>
              <Button
                type="submit"
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                {filter}
              </Button>
            </Container>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex" }} px={2} py={2}>
                  <Box sx={{ display: "grid" }} px={2} py={2}>
                    <TextField
                      id="cuisine"
                      label="Cuisine"
                      variant="standard"
                      // helperText="South Indian,North Indian"
                      onChange={(event) => {
                        setCuisine(event.target.value);
                      }}
                    />
                    <TextField
                      id="course"
                      label="Course"
                      variant="standard"
                      // helperText="Breakfast, Lunch"
                      onChange={(event) => {
                        setCourse(event.target.value);
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "grid" }} px={2} py={2}>
                    {/* <TextField
                              id="healthCondition"
                              label="Health Conditions"
                              variant="standard"
                              helperText="Lactose Tolerance,Diabetic"
                              // onChange={(event) => {
                              //   setCuisine(event.target.value);
                              // }}
                            /> */}
                    <TextField
                      id="course"
                      label="Min Calorie"
                      variant="standard"
                      // helperText="Breakfast, Lunch"
                      onChange={(event) => {
                        setMinCalories(event.target.value);
                      }}
                    />
                    <TextField
                      id="course"
                      label="Max Calorie"
                      variant="standard"
                      // helperText="Breakfast, Lunch"
                      onChange={(event) => {
                        setMaxCalories(event.target.value);
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex" }} px={2} py={2}>
                  <Box sx={{ display: "grid" }} px={2} py={2}>
                    <TextField
                      id="req-ing"
                      label="Included Ingredients"
                      variant="standard"
                      // helperText="Tomato, Greens, Paneer"
                      onChange={(event) => {
                        setIncluding_ingredients(event.target.value);
                      }}
                    />
                    <IconButton sx={{ borderRadius: "5px", color: "blue" }}>
                      <AddIcon onClick={addIncluding_ingredients_list} />
                    </IconButton>

                    <Stack direction="column" spacing={1}>
                      {including_ingredients_list.map((inItem, index) => {
                        return (
                          <>
                            <Chip
                              key={`chip-${index}`}
                              label={inItem}
                              variant="outlined"
                              onDelete={() => handleIncludedIngredient(inItem)}
                              deleteIcon={<CloseIcon />}
                              style={{
                                marginRight: "8px",
                                marginBottom: "8px",
                              }}
                            />
                          </>
                        );
                      })}
                    </Stack>
                  </Box>
                  <Box sx={{ display: "grid" }} px={2} py={2}>
                    <TextField
                      id="exc-ing"
                      label="Restricted Ingredients"
                      variant="standard"
                      // helperText="Almonds, Peanuts, Chicken"
                      onChange={(event) => {
                        setExcluding_ingredients(event.target.value);
                      }}
                    />
                    <IconButton sx={{ borderRadius: "5px", color: "blue" }}>
                      <AddIcon onClick={addExcluding_ingredients_list} />
                    </IconButton>

                    <Stack direction="column" spacing={1}>
                      {excluding_ingredients_list.map((inItem, index) => {
                        return (
                          <>
                            <Chip
                              key={`chip-${index}`}
                              label={inItem}
                              variant="outlined"
                              onDelete={() => handleExcludedIngredient(inItem)}
                              deleteIcon={<CloseIcon />}
                              style={{
                                marginRight: "8px",
                                marginBottom: "8px",
                              }}
                            />
                          </>
                        );
                      })}
                    </Stack>
                  </Box>
                </Box>
              </Box>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ></Grid>
            </Collapse>
            <Container>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={callquery}
              >
                Search
              </Button>
            </Container>
          </Box>

          <motion.div
            className="container text-center  bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Grid container spacing={4} sx={{ py: 3 }}>
              {recipes
                .filter((post) => {
                  if (query === "") {
                    return post;
                  }
                })
                .map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="item"
                      transition={{ duration: 0.2 }}
                      exit={{ scale: 0.5 }}
                      key={card}
                    >
                      {/* <Card sx={{ maxWidth: 345 }} onClick={ 
                                () => recipe(card._id)
                              }> */}
                      <Card sx={{ maxWidth: 345, height: 400 }}>
                        <CardMedia
                          component="img"
                          height="60%"
                          style={{ cursor: "pointer" }}
                          image={card.image}
                          alt="dishcover"
                          onError={(e) => {
                            e.target.src =
                              "https://img.freepik.com/premium-vector/illustration-vector-isolated-indian-food-dishes-table-top-view-cartoon-doodle-style_325203-160.jpg";
                          }}
                          onClick={() => recipe(card._id)}
                        />
                        <CardHeader
                          height="20%"
                          title={
                            <div
                              style={{
                                display: "grid",
                                alignItems: "center",
                                height: "100%",
                                flex: 1,
                              }}
                            >
                              <span
                                style={{
                                  minWidth: 0,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  fontSize: "1rem",
                                  lineHeight: "1.2",
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
                            // color={savedRecipeArray_id && savedRecipeArray_id.includes(card._id) ? "secondary" : "primary"}
                            style={{
                              color:
                                savedRecipeArray_id &&
                                savedRecipeArray_id.includes(card._id)
                                  ? "#f00a81"
                                  : "grey",
                            }}
                            onClick={() => {
                              handleSavedClick(card._id);
                            }}
                          >
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="share"
                            onClick={() => {
                              handleShareClick(card.recipeURL);
                            }}
                          >
                            <ShareIcon />
                          </IconButton>

                          <IconButton
                            aria-label="share"
                            onClick={() => recipe(card._id)}
                          >
                            <OpenInNewIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
            </Grid>
          </motion.div>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={increase_count}
          >
            View More
          </Button>
        </main>
      )}
    </>
  );
}
