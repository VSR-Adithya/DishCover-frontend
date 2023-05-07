import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import moment from "moment";
import excludeVariablesFromRoot from "@mui/material/styles/excludeVariablesFromRoot";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// api call to get user details
const getUser = async () => {
  const response = await fetch("http://localhost:4000/api/user/getUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: JSON.parse(localStorage.getItem("user")).username,
    }),
  });

  try {
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.error(err.message);
  }
};

export const getHealthReport = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  //  make api call to get use details and get health conditions
  let userDetails = await getUser({ username: user.username });
  console.log("userDetails : ", userDetails);

  const activity_cal_conv = {
    "Little or not exercise": 1.2,
    "Light exercise of sports 1-3 days a week": 1.375,
    "Moderate exercise or sports 3-5 days a week": 1.55,
    "Hard exercise or sports 6-7 days a week": 1.725,
    "Very hard exercise or sports, training twice a day": 1.9,
  };

  const sex_cal_conv = {
    Male: {
      0: 88.36,
      1: 13.4,
      2: 4.8,
      3: 5.7,
    },
    Female: {
      0: 447.6,
      1: 9.2,
      2: 3.1,
      3: 4.3,
    },
  };

  const diabetic = userDetails.diabetic;
  const kidneyDisease = userDetails.kidneyDisease;
  const heartDisease = userDetails.heartDisease;
  const lactoseIntolerance = userDetails.lactoseIntolerance;
  const highBloodPressure = userDetails.highBloodPressure;
  const isVeg = userDetails.isVeg;
  const height = userDetails.height;
  const weight = userDetails.weight;
  const activityLevel = activity_cal_conv[userDetails.activityLevel];
  const age = moment().diff(userDetails.dob, "years");
  const sex = userDetails.sex;

  const BMR =
    sex_cal_conv[sex][0] +
    sex_cal_conv[sex][1] * weight +
    sex_cal_conv[sex][2] * height -
    sex_cal_conv[sex][3] * age;

  let healthReport = {
    userName: user.username,
    maxCalories: BMR,
    healthConditions: "",
    allergy: userDetails.allergy,
  }

  //  for heat=lth condituion will be string seperated by comma
  if (highBloodPressure) {
    healthReport.healthConditions += "High Blood Pressure,";
  }

  if (diabetic) {
    healthReport.healthConditions += "Diabetic,";
  }

  if (kidneyDisease) {
    healthReport.healthConditions += "Kidney Disease,";
  }

  if (heartDisease) {
    healthReport.healthConditions += "Heart Disease,";
  }

  if (lactoseIntolerance) {
    healthReport.healthConditions += "Lactose Intolerance,";
  }

  if (isVeg) {
    healthReport.healthConditions += "Vegetarian,";
  }

  // remove last comma
  healthReport.healthConditions = healthReport.healthConditions.slice(0, -1);

  return healthReport;
}

// api call to update user details
const update = async (requestData, setError_message) => {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    dob,
    sex,
    height,
    weight,
    activityLevel,
    bloodGrp,
    isVeg,
    diabetic,
    lactoseIntolerance,
    highBloodPressure,
    heartDisease,
    kidneyDisease,
    allergy,
  } = requestData;

  const res = await fetch("http://localhost:4000/api/user/updateUserDetails", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password,
      firstName,
      lastName,
      dob,
      sex,
      height,
      weight,
      activityLevel,
      bloodGrp,
      isVeg,
      diabetic,
      lactoseIntolerance,
      highBloodPressure,
      heartDisease,
      kidneyDisease,
      allergy,
    }),
  });
  console.log("res : ", res);

  const data = await res.json();

  if (!res.ok) {
    console.log("update failed");
    setError_message(data.error);

    // throw Error(data.message || 'Something went wrong')
  }
  if (res.ok) {
    console.log("update success");
    setError_message("");

    // save user in local storage
    localStorage.setItem("user", JSON.stringify(data));
  }
};

// // return search param for healthy search based on profile
export const getSearchParam = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  //  make api call to get use details and get health conditions
  let userDetails = await getUser({ username: user.username });
  console.log("userDetails : ", userDetails);

  const activity_cal_conv = {
    "Little or not exercise": 1.2,
    "Light exercise of sports 1-3 days a week": 1.375,
    "Moderate exercise or sports 3-5 days a week": 1.55,
    "Hard exercise or sports 6-7 days a week": 1.725,
    "Very hard exercise or sports, training twice a day": 1.9,
  };

  const sex_cal_conv = {
    Male: {
      0: 88.36,
      1: 13.4,
      2: 4.8,
      3: 5.7,
    },
    Female: {
      0: 447.6,
      1: 9.2,
      2: 3.1,
      3: 4.3,
    },
  };

  const diabetic = userDetails.diabetic;
  const kidneyDisease = userDetails.kidneyDisease;
  const heartDisease = userDetails.heartDisease;
  const lactoseIntolerance = userDetails.lactoseIntolerance;
  const highBloodPressure = userDetails.highBloodPressure;
  const isVeg = userDetails.isVeg;
  const height = userDetails.height;
  const weight = userDetails.weight;
  const activityLevel = activity_cal_conv[userDetails.activityLevel];
  const age = moment().diff(userDetails.dob, "years");
  const sex = userDetails.sex;

  const BMR =
    sex_cal_conv[sex][0] +
    sex_cal_conv[sex][1] * weight +
    sex_cal_conv[sex][2] * height -
    sex_cal_conv[sex][3] * age;

  // initialize search params
  let searchParams = {
    recipeName: "",
    includedIngredients: [],
    excludedIngredients: [],
    course: "",
    cuisine: "",
    minCalories: 0,
    maxCalories: 1000000,
    count: 42,
    maxSodium: 10000000,
    maxSugar: 10000000,
    maxTotalFat: 10000000,
    maxCarbohydrates: 10000000,
    maxSaturatedFat: 10000000,
  };

  if (highBloodPressure) {
    // Sodium: less than 140 mg per serving
    // Saturated fat: less than 3 g per serving
    // Total fat: less than 10 g per serving

    searchParams["maxSodium"] = 140;
    searchParams["maxTotalFat"] = 100;
    searchParams["maxSaturatedFat"] = 3;
  }

  // set search param based on health conditions
  if (diabetic) {
    // Sugar: less than 10 g per serving
    // Total carbohydrate: less than 45 g per serving

    searchParams["maxSugar"] = 10;
    searchParams["maxCarbohydrates"] = 45;
  }

  if (kidneyDisease) {
    // Sodium: less than 150-200 mg per serving (depending on the severity of kidney disease)
    // Potassium: less than 250-500 mg per serving (depending on the severity of kidney disease)
    // Phosphorus: less than 100 mg per serving

    searchParams["maxSodium"] = 150;
  }

  if (heartDisease) {
    // Saturated fat: less than 3 g per serving
    // Total fat: less than 10 g per serving
    // Cholesterol: less than 60 mg per serving

    searchParams["maxTotalFat"] = 100;
    searchParams["maxSuturatedFat"] = 3;
  }

  if (lactoseIntolerance) {
    // updated excluded ingredient to account for lactose intolerance
    searchParams["excludedIngredients"].push("milk", "cheese", "yogurt");
  }

  if (isVeg) {
    // updated excluded ingredient to account for vegetarianism
    searchParams["excludedIngredients"].push(
      "fish",
      "chicken",
      "beef",
      "pork",
      "mutton",
      "prawns",
      "crab",
      "egg"
    );
  }

  if (BMR) {
    if(BMR >=10){
      searchParams["maxCalories"] = (BMR) * (activityLevel);
    }
  }

  console.log(
    "!!!!!!!!!!!!!!searchParams----- : ",
    searchParams["excludedIngredients"]
  );

  return searchParams;
};

export default function MiniDrawer() {
  const theme = useTheme();
  const [userDetails, setUserDetails] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodGrp, setBloodGrp] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [diabetic, setDiabetic] = useState("");
  const [kidneyDisease, setKidneyDisease] = useState("");
  const [heartDisease, setHeartDisease] = useState("");
  const [lactose, setLactose] = useState("");
  const [isveg, setIsveg] = useState("");
  const [allergy, setAllergy] = useState("");

  const [edit, setEdit] = useState(false);

  const userUpdatedDetails = {
    username: username,
    email: email,
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    sex: sex,
    height: height,
    weight: weight,
    activityLevel: activityLevel,
    bloodGrp: bloodGrp,
    isVeg: isveg,
    diabetic: diabetic,
    lactoseIntolerance: lactose,
    highBloodPressure: bloodPressure,
    heartDisease: heartDisease,
    kidneyDisease: kidneyDisease,
    allergy: allergy,
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch("http://localhost:4000/api/user/getUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: JSON.parse(localStorage.getItem("user")).username,
        }),
      });

      try {
        const parseRes = await response.json();
        setUserDetails(parseRes);
        setUsername(parseRes.username);
        setEmail(parseRes.email);
        setFirstName(parseRes.firstName);
        setLastName(parseRes.lastName);
        setDob(parseRes.dob);
        setSex(parseRes.sex);
        setDiabetic(parseRes.diabetic);
        setKidneyDisease(parseRes.kidneyDisease);
        setHeartDisease(parseRes.heartDisease);
        setHeight(parseRes.height);
        setWeight(parseRes.weight);
        setActivityLevel(parseRes.activityLevel);
        setBloodGrp(parseRes.bloodGrp);
        setBloodPressure(parseRes.highBloodPressure);
        setLactose(parseRes.lactoseIntolerance);
        setIsveg(parseRes.isVeg);
        setAllergy(parseRes.allergy);
      } catch (err) {
        console.error(err.message);
      }
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    const updateUserDetails = async () => {
      const response = await fetch(
        "http://localhost:4000/api/user/updateUserDetails",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userUpdatedDetails),
        }
      );

      try {
        const parseRes = await response.json();
        console.log(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    };
    updateUserDetails();
  }, [edit]);

  const width = window.innerWidth;
  const wheight = window.innerHeight;

  const profile = (
    <>
      <Navbar />
      <Box
        style={{
          minHeight: wheight,
          minWidth: width * 0.9,
          background: "linear-gradient(90deg, white 10%, #f4f6c6 90%)",
        }}
        px={5}
      >
        <Container sx={{ py: 1 }} maxWidth="md">
          <Container sx={{ py: 1 }} maxWidth="md">
            <Grid container spacing={2} style={{}}>
              <Grid container spacing={1}>
                <motion.div
                  className="container text-center  bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  {
                    <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                      <DrawerHeader />
                      <ThemeProvider theme={theme}>
                        <CssBaseline />

                        <main>
                          <CssBaseline />
                          <Box sx={{ display: "flex" }}>
                            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                              <DrawerHeader />
                              <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                  User Details
                                </Typography>
                                <Grid
                                  container
                                  spacing={3}
                                  style={{ paddingTop: "30px" }}
                                >
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      id="username"
                                      name="username"
                                      label="Username"
                                      fullWidth
                                      autoComplete="given-name"
                                      variant="outlined"
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                      value={username}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      id="email"
                                      name="email"
                                      label="Email Address"
                                      fullWidth
                                      autoComplete="family-name"
                                      variant="outlined"
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                      value={email}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    {!edit ? (
                                      <TextField
                                        id="firstName"
                                        name="firstName"
                                        label="First name"
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={firstName}
                                      />
                                    ) : (
                                      <TextField
                                        id="firstName"
                                        name="firstName"
                                        label="First name"
                                        fullWidth
                                        variant="standard"
                                        defaultValue={firstName}
                                        onChange={(event) => {
                                          setFirstName(event.target.value);
                                        }}
                                      />
                                    )}
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    {!edit ? (
                                      <TextField
                                        id="lastName"
                                        name="lastName"
                                        label="Last name"
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={lastName}
                                      />
                                    ) : (
                                      <TextField
                                        id="lastName"
                                        name="lastName"
                                        label="Last name"
                                        fullWidth
                                        variant="standard"
                                        defaultValue={lastName}
                                        onChange={(event) => {
                                          setLastName(event.target.value);
                                        }}
                                      />
                                    )}
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    {!edit ? (
                                      <TextField
                                        id="dob"
                                        name="dob"
                                        label="Date of Birth"
                                        type="date"
                                        fullWidth
                                        autoComplete="dob"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={moment(dob).format("YYYY-MM-DD")}
                                      />
                                    ) : (
                                      <TextField
                                        required
                                        id="dob"
                                        name="dob"
                                        label="Date of Birth"
                                        type="date"
                                        fullWidth
                                        autoComplete="dob"
                                        variant="standard"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        defaultValue={moment(dob).format(
                                          "YYYY-MM-DD"
                                        )}
                                        onChange={(event) => {
                                          setDob(event.target.value);
                                        }}
                                      />
                                    )}
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    {!edit ? (
                                      <TextField
                                        id="sex"
                                        name="sex"
                                        label="Sex"
                                        fullWidth
                                        autoComplete="sex"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={sex}
                                      />
                                    ) : (
                                      <FormControl>
                                        <InputLabel
                                          id="sex-label"
                                          required
                                          style={{ marginLeft: "-0.9em" }}
                                        >
                                          Sex
                                        </InputLabel>
                                        <Select
                                          helperText="Select your blood group"
                                          variant="standard"
                                          labelID="sex-label"
                                          align="left"
                                          id="sex"
                                          name="sex"
                                          sx={{
                                            width: "24em",
                                          }}
                                          defaultValue={sex}
                                          onChange={(event) => {
                                            setSex(event.target.value);
                                          }}
                                        >
                                          <MenuItem value={"Male"}>
                                            Male
                                          </MenuItem>
                                          <MenuItem value={"Female"}>
                                            Female
                                          </MenuItem>
                                          <MenuItem value={"Other"}>
                                            Other
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    )}
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    {!edit ? (
                                      <TextField
                                        id="blood-type"
                                        name="blood-type"
                                        label="Blood Type"
                                        fullWidth
                                        autoComplete="bt"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={bloodGrp}
                                      />
                                    ) : (
                                      <FormControl>
                                        <InputLabel
                                          id="bloodgrp-label"
                                          required
                                          style={{ marginLeft: "-0.9em" }}
                                        >
                                          Blood Group
                                        </InputLabel>
                                        <Select
                                          variant="standard"
                                          labelID="bloodgrp-label"
                                          id="bloodgroup"
                                          align="left"
                                          defaultValue={bloodGrp}
                                          required
                                          name="bloodgroup"
                                          sx={{
                                            width: "24.5em",
                                          }}
                                          onChange={(event) => {
                                            setBloodGrp(event.target.value);
                                          }}
                                        >
                                          <MenuItem value={"A+"}>A+</MenuItem>
                                          <MenuItem value={"A-"}>A-</MenuItem>
                                          <MenuItem value={"B+"}>B+</MenuItem>
                                          <MenuItem value={"B-"}>B-</MenuItem>
                                          <MenuItem value={"O+"}>O+</MenuItem>
                                          <MenuItem value={"O-"}>O-</MenuItem>
                                          <MenuItem value={"AB+"}>AB+</MenuItem>
                                          <MenuItem value={"AB-"}>AB-</MenuItem>
                                          <MenuItem value={"Others"}>
                                            Others
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    )}
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    {!edit ? (
                                      <TextField
                                        id="allergy"
                                        label="Allergies"
                                        fullWidth
                                        autoComplete="Health conditions"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={allergy}
                                      />
                                    ) : (
                                      <TextField
                                        id="allergy"
                                        name="allergy"
                                        label="Allergies"
                                        helperText="If yes, please specify (comma separated)"
                                        fullWidth
                                        autoComplete=""
                                        variant="standard"
                                        defaultValue={allergy}
                                        onChange={(event) => {
                                          setAllergy(event.target.value);
                                        }}
                                      />
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    {!edit ? (
                                      <TextField
                                        id="Height"
                                        label="Height"
                                        fullWidth
                                        type="number"
                                        autoComplete="Height"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={height}
                                      />
                                    ) : (
                                      <TextField
                                        id="Height"
                                        label="Height"
                                        fullWidth
                                        type="number"
                                        autoComplete="Height"
                                        variant="standard"
                                        defaultValue={height}
                                        onChange={(event) => {
                                          setHeight(event.target.value);
                                        }}
                                      />
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    {!edit ? (
                                      <TextField
                                        id="Weight"
                                        label="Weight"
                                        fullWidth
                                        type="number"
                                        autoComplete="Weight"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={weight}
                                      />
                                    ) : (
                                      <TextField
                                        id="Weight"
                                        label="Weight"
                                        fullWidth
                                        type="number"
                                        autoComplete="Weight"
                                        variant="standard"
                                        defaultValue={weight}
                                        onChange={(event) => {
                                          setWeight(event.target.value);
                                        }}
                                      />
                                    )}
                                  </Grid>
                                  <Grid item xs={12}>
                                    {!edit ? (
                                      <TextField
                                        id="Activity level"
                                        label="Activity level"
                                        helperText="Number of times you exercise per week"
                                        fullWidth
                                        autoComplete="Activity level"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={activityLevel}
                                      />
                                    ) : (
                                      <FormControl>
                                        <InputLabel
                                          id="activitylvl-label"
                                          required
                                          style={{ marginLeft: "-0.9em" }}
                                        >
                                          Activity Level
                                        </InputLabel>
                                        <Select
                                          labelID="activitylvl-label"
                                          variant="standard"
                                          id="activitylevel"
                                          required
                                          name="activitylevel"
                                          align="left"
                                          defaultValue={activityLevel}
                                          sx={{
                                            width: "50em",
                                          }}
                                          onChange={(event) => {
                                            setActivityLevel(
                                              event.target.value
                                            );
                                          }}
                                        >
                                          <MenuItem
                                            value={"Little or no exercise"}
                                          >
                                            Little or no exercise
                                          </MenuItem>
                                          <MenuItem
                                            value={
                                              "Light exercise or sports 3-5 days a week"
                                            }
                                          >
                                            Light exercise or sports 3-5 days a
                                            week
                                          </MenuItem>
                                          <MenuItem
                                            value={
                                              "Moderate exercise or sports 3-5 days a week"
                                            }
                                          >
                                            Moderate exercise or sports 3-5 days
                                            a week
                                          </MenuItem>
                                          <MenuItem
                                            value={
                                              "Hard exercise or sports 6-7 days a week"
                                            }
                                          >
                                            Hard exercise or sports 6-7 days a
                                            week
                                          </MenuItem>
                                          <MenuItem
                                            value={
                                              "Very hard exercise or sports, training twice a day"
                                            }
                                          >
                                            Very hard exercise or sports,
                                            training twice a day
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    {!edit ? (
                                      <TextField
                                        id="high-blood-pressure"
                                        label="High Blood Pressure"
                                        fullWidth
                                        autoComplete="Health conditions"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={bloodPressure ? "Yes" : "No"}
                                      />
                                    ) : (
                                      <FormGroup>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              id="high-blood-pressure"
                                              name="High Blood Pressure"
                                              defaultChecked={bloodPressure}
                                              onChange={(event) => {
                                                setBloodPressure(
                                                  event.target.checked
                                                );
                                                console.log(
                                                  event.target.checked
                                                );
                                              }}
                                            />
                                          }
                                          label="High Blood Pressure"
                                        />
                                      </FormGroup>
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    {!edit ? (
                                      <TextField
                                        id="diabetic"
                                        label="Diabetic"
                                        fullWidth
                                        autoComplete="Health conditions"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={diabetic ? "Yes" : "No"}
                                      />
                                    ) : (
                                      <FormGroup>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              id="diabetic"
                                              name="diabetic"
                                              defaultChecked={diabetic}
                                              onChange={(event) => {
                                                setDiabetic(
                                                  event.target.checked
                                                );
                                                console.log(
                                                  event.target.checked
                                                );
                                              }}
                                            />
                                          }
                                          label="Diabetic"
                                        />
                                      </FormGroup>
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    {!edit ? (
                                      <TextField
                                        id="kidney-disease"
                                        label="Kidney Disease"
                                        fullWidth
                                        autoComplete="Health conditions"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={kidneyDisease ? "Yes" : "No"}
                                      />
                                    ) : (
                                      <FormGroup>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              id="kidney-disease"
                                              name="Kidney Disease"
                                              defaultChecked={kidneyDisease}
                                              onChange={(event) => {
                                                setKidneyDisease(
                                                  event.target.checked
                                                );
                                                console.log(
                                                  event.target.checked
                                                );
                                              }}
                                            />
                                          }
                                          label="Kidney Disease"
                                        />
                                      </FormGroup>
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    {!edit ? (
                                      <TextField
                                        id="heart-disease"
                                        label="Heart Disease"
                                        fullWidth
                                        autoComplete="Health conditions"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={heartDisease ? "Yes" : "No"}
                                      />
                                    ) : (
                                      <FormGroup>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              id="heart-disease"
                                              name="Heart Disease"
                                              defaultChecked={heartDisease}
                                              onChange={(event) => {
                                                setHeartDisease(
                                                  event.target.checked
                                                );
                                                console.log(
                                                  event.target.checked
                                                );
                                              }}
                                            />
                                          }
                                          label="Heart Disease"
                                        />
                                      </FormGroup>
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    {!edit ? (
                                      <TextField
                                        id="lactose-intolerance"
                                        label="Lactose Intolerance"
                                        fullWidth
                                        autoComplete="Health conditions"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={lactose ? "Yes" : "No"}
                                      />
                                    ) : (
                                      <FormGroup>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              id="lactose-intolerance"
                                              name="Lactose Intolerance"
                                              defaultChecked={lactose}
                                              onChange={(event) => {
                                                setLactose(
                                                  event.target.checked
                                                );
                                                console.log(
                                                  event.target.checked
                                                );
                                              }}
                                            />
                                          }
                                          label="Lactose Intolerance"
                                        />
                                      </FormGroup>
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    {!edit ? (
                                      <TextField
                                        id="is-veg"
                                        label="isVeg"
                                        fullWidth
                                        autoComplete="isVeg"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value={isveg ? "Yes" : "No"}
                                      />
                                    ) : (
                                      <FormGroup>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              id="is-veg"
                                              name="isVeg"
                                              defaultChecked={isveg}
                                              onChange={(event) => {
                                                setIsveg(event.target.checked);
                                                console.log(
                                                  event.target.checked
                                                );
                                              }}
                                            />
                                          }
                                          label="Vegetarian"
                                        />
                                      </FormGroup>
                                    )}
                                  </Grid>
                                </Grid>
                              </React.Fragment>
                              {!edit ? (
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    setEdit(true);
                                  }}
                                  sx={{ mt: 3, ml: 1 }}
                                >
                                  Edit
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    setEdit(false);
                                  }}
                                  sx={{ mt: 3, ml: 1 }}
                                >
                                  Save Changes
                                </Button>
                              )}
                            </Box>
                          </Box>
                        </main>
                      </ThemeProvider>
                    </Box>
                  }
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Box>
    </>
  );
  // if already logged in
  if (JSON.parse(localStorage.getItem("user") !== null)) {
    return profile;
  } else {
    console.log("not logged in");
    window.location.href = "/signin";
  }
}
