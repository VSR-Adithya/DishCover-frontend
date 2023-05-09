import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

import Navbar from "./navbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../App.css";
import { domain } from "../App";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#F5F5F5",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "500",
        ...sx,
      }}
      {...other}
    />
  );
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Recipe() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  // Get the URLSearchParams object
  const params = new URLSearchParams(window.location.search);
  // Get the value of the _id parameter from the URL
  const _id = params.get("_id");

  // get recipe data from backend
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://dishcover-api.onrender.com/recipes/getRecipeById/${_id}`
        );
        setTimeout(() => {
          setIsLoading(false);
        }, 0);
        if (response.ok) {
          const recipeData = await response.json();
          setRecipe(recipeData);
        } else {
          console.error("Failed to fetch recipe:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      }
    };
    fetchRecipe();
  }, [_id]);
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Check if recipe object is empty
  if (Object.keys(recipe).length === 0) {
    // Render loading or placeholder UI
    return (
      <div>
        <Navbar />
        <div
          class="bg"
          style={{
            minHeight: height,
            minWidth: width,
          }}
        ></div>
        <img
          class="rotate"
          src={process.env.PUBLIC_URL + "/load2.png"}
          alt="loading"
        />
        <Typography variant="h5" color={"black"}>
          No Such Recipe Found
        </Typography>
      </div>
    ); // or return any other placeholder UI
  }

  let recipe_calories = recipe.nutritionalValues.calories;
  let recipe_Total = recipe.nutritionalValues.totalFat;
  let recipe_saturated = recipe.nutritionalValues.saturateFat;
  let recipe_carbohydrates = recipe.nutritionalValues.carbohydrate;
  let recipe_sugar = recipe.nutritionalValues.sugar;
  let recipe_sodium = recipe.nutritionalValues.sodium;

  function Crop(props) {
    const { sx, ...other } = props;
    return (
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          backgroundImage: `url(${recipe.image})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: "transparent",
          backgroundClip: "text",
          webkitBackgroundClip: "text",
        }}
        {...other}
      />
    );
  }

  const recipepage = (
    <>
      <Navbar />
      <div
        class="bg"
        style={{
          minHeight: height,
          minWidth: width * 0.9,
        }}
      ></div>
      <div class="content">
        <Box sx={{ display: "flex" }} py={3}>
          <Container
            sx={{ py: 1 }}
            maxWidth="md"
            style={{
              backgroundColor: "rgba(1000,1000,1000,0.9)",
              borderRadius: "5%",
            }}
          >
            {" "}
            <Container sx={{ py: 1 }} maxWidth="md">
              {isLoading ? (
                <img
                  class="rotate"
                  src={process.env.PUBLIC_URL + "/load2.png"}
                  alt="loading"
                />
              ) : (
                <motion.div
                  className="container text-center  bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {
                    <ThemeProvider theme={theme}>
                      <DrawerHeader />
                      <CssBaseline />
                      <main>
                        <Container sx={{ maxWidth: "100%" }}>
                          {/* <Crop>{recipe.recipeName}</Crop> */}
                          <Typography py={2} variant="h4" color={"black"}>
                            {recipe.recipeName}
                          </Typography>

                          <Typography align={"Center"}>
                            {/* <img
                                    class="cropped-image"
                                    width="400px"
                                    heigth="400px"
                                    src={recipe.image}
                                    alt="Recipe Image"
                                  /> */}
                            <img
                              style={{ borderRadius: "5%" }}
                              width="50%"
                              heigth="50%"
                              onError={(e) => {
                                e.target.src =
                                  "https://img.freepik.com/premium-vector/illustration-vector-isolated-indian-food-dishes-table-top-view-cartoon-doodle-style_325203-160.jpg";
                              }}
                              src={recipe.image}
                              alt="Recipe Image"
                            />
                          </Typography>
                          <Typography
                            align={"left"}
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            {recipe.Description}
                          </Typography>

                          <Grid item container={2} py={2}>
                            <Grid item xs={6} px={2}>
                              <Box>
                                <Typography
                                  align={"center"}
                                  variant="h5"
                                  gutterBottom
                                >
                                  Ingredients
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  position: "relative",
                                  display: "flex",
                                  borderTop: 1,
                                }}
                                px={2}
                              >
                                <Grid sx={3}>
                                  {recipe.Ingredients?.ingredient?.map(
                                    (row, index) => (
                                      <React.Fragment key={index}>
                                        <Typography align="left">
                                          <Item>
                                            <span>{row.ingName}</span>{" "}
                                            <span>{row.ingAmount}</span>
                                          </Item>
                                        </Typography>
                                      </React.Fragment>
                                    )
                                  )}
                                </Grid>
                              </Box>
                            </Grid>
                            <Grid item xs={6} px={1}>
                              <Box>
                                <Typography
                                  align={"center"}
                                  variant="h5"
                                  gutterBottom
                                >
                                  Nutritional Values
                                </Typography>
                              </Box>
                              <Box sx={{ borderTop: 1 }} py={1}>
                                <TableContainer component={Paper}>
                                  <Table
                                    sx={{ alignContent: "center" }}
                                    aria-label="simple table"
                                    style={{ backgroundColor: "#F5F5F5" }}
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                          Nutrition
                                        </TableCell>
                                        <TableCell
                                          sx={{ fontWeight: "bold" }}
                                          align="right"
                                        >
                                          Values
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell component="th" scope="row">
                                          Calories(kcal)
                                        </TableCell>
                                        <TableCell align="right">
                                          {recipe_calories.toFixed(2)}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell component="th" scope="row">
                                          Total Fat(gm)
                                        </TableCell>
                                        <TableCell align="right">
                                          {recipe_Total.toFixed(2)}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell component="th" scope="row">
                                          Saturated Fat(gm)
                                        </TableCell>
                                        <TableCell align="right">
                                          {recipe_saturated.toFixed(2)}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell component="th" scope="row">
                                          Carbohydrates(gm)
                                        </TableCell>
                                        <TableCell align="right">
                                          {recipe_carbohydrates.toFixed(2)}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell component="th" scope="row">
                                          Sugar(gm)
                                        </TableCell>
                                        <TableCell align="right">
                                          {recipe_sugar.toFixed(2)}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell component="th" scope="row">
                                          Sodium(mg)
                                        </TableCell>
                                        <TableCell align="right">
                                          {recipe_sodium.toFixed(2)}
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </Grid>
                          </Grid>

                          <Typography align={"left"} variant="h5" gutterBottom>
                            Instructions
                          </Typography>

                          <Box
                            sx={{
                              display: "grid",
                              borderTop: 1,
                              gridTemplateRows: "repeat(3, 1fr)",
                            }}
                          >
                            {recipe.Instructions &&
                              recipe.Instructions.map((row, index) => (
                                <React.Fragment key={index}>
                                  <Typography align="left">
                                    <Item>{row}</Item>
                                  </Typography>
                                </React.Fragment>
                              ))}
                          </Box>
                        </Container>
                        <Container sx={{ float: "left" }}>
                          <Box>
                            <Typography align="left" variant="h6" gutterBottom>
                              Contributor : {recipe.contributorName}
                            </Typography>
                          </Box>
                          <Typography align="left" variant="h6" gutterBottom>
                            Source URL :
                            <Button href={recipe.recipeURL}>
                              {recipe.recipeURL}
                            </Button>
                          </Typography>
                        </Container>{" "}
                      </main>
                    </ThemeProvider>
                  }
                </motion.div>
              )}
            </Container>
          </Container>
        </Box>
      </div>
    </>
  );
  // if already logged in
  if (JSON.parse(localStorage.getItem("user") !== null)) {
    return recipepage;
  } else {
    window.location.href = `${domain}/signin`;
  }
}
