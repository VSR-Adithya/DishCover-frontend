import React, { useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// const sexOptions = [
//   { value: "Male", label: "Male" },
//   { value: "Female", label: "Female" },
// ];

// const bldGrpOptions = [
//   { value: "A+", label: "A+" },
//   { value: "A-", label: "A-" },
//   { value: "B+", label: "B+" },
//   { value: "B-", label: "B-" },
//   { value: "O+", label: "O+" },
//   { value: "O-", label: "O-" },
//   { value: "AB+", label: "AB+" },
//   { value: "AB-", label: "AB-" },
//   { value: "Others", label: "Others" },
// ];

// const activityLevelOptions = [
//   { value: "Little or not exercise", label: "Little or not exercise" },
//   { value: "Light exercise of sports 1-3 days a week", label: "Light exercise of sports 1-3 days a week" },
//   { value: "Moderate exercise or sports 3-5 days a week", label: "Moderate exercise or sports 3-5 days a week" },
//   { value: "Hard exercise or sports 6-7 days a week", label: "Hard exercise or sports 6-7 days a week" },
//   { value: "Very hard exercise or sports, training twice a day", label: "Very hard exercise or sports, training twice a day" }
// ];

const signup = async (requestData, setError_message) => {
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

  const res = await fetch("https://dishcover-api.onrender.com/api/user/signup", {
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

  const data = await res.json();

  if (!res.ok) {
    setError_message(data.error);

    // throw Error(data.message || 'Something went wrong')
  }
  if (res.ok) {
    setError_message("");

    // save user in local storage
    localStorage.setItem("user", JSON.stringify(data));
  }
};

export default function Signup() {
  const [error_message, setError_message] = React.useState("");

  const comparePasswords = () => {
    // Compare password and confirm password fields
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password != confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };
  const sexRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    var myForm = document.getElementById("myForm");
    var data = new FormData(myForm);

    if (comparePasswords() == true) {
      // Prepare request data
      console.log("data : ", data.get("activitylevel"));
      const requestData = {
        email: data.get("email"),
        username: data.get("username"),
        password: data.get("password"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        dob: data.get("dob"),
        sex: data.get("sex"),
        height: data.get("height"),
        weight: data.get("weight"),
        activityLevel: data.get("activitylevel"),
        bloodGrp: data.get("bloodgroup"),
        diabetic: data.get("diabetic") == undefined ? false : true,
        highBloodPressure:
          data.get("highBloodPressure") == undefined ? false : true,
        highBloodPressure:
          data.get("highBloodPressure") == undefined ? false : true,
        heartDisease: data.get("heartDisease") == undefined ? false : true,
        kidneyDisease: data.get("kidneyDisease") == undefined ? false : true,
        lactoseIntolerance:
          data.get("lactoseIntolerance") == undefined ? false : true,
        isVeg: data.get("isVeg") == undefined ? false : true,
        allergy: data.get("allergy"),
      };
      // console.log("requestData : ", requestData);
      await signup(requestData, setError_message);
      console.error("error_message : ", error_message);

      // rederict to dashboard
      if (JSON.parse(localStorage.getItem("user") !== null)) {
        window.location.href = "/dashboard";
      }
    }
  };

  const signuppage = (
    <form id="myForm">
      <Container>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        ></AppBar>
        <Grid sx={{ display: "flex" }} container spacing={3}>
          <Grid item xs={12} md={6} component="main">
            <Container component="main">
              <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <Typography component="h1" variant="h4" align="center">
                  Register
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      fullWidth
                      autoComplete="email"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="username"
                      name="username"
                      label="Username"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      autoComplete="new-password"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      autoComplete="new-password"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <InputLabel id="sex-label" required>
                        Sex
                      </InputLabel>
                      <Select
                        helperText="Select your blood group"
                        variant="standard"
                        labelID="sex-label"
                        id="sex"
                        name="sex"
                        sx={{
                          width: 150,
                        }}
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <React.Fragment>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="height"
                        label="Height"
                        helperText="(in cm)"
                        fullWidth
                        type="Number"
                        name="height"
                        autoComplete="Height"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="weight"
                        label="Weight"
                        helperText="(in kg)"
                        fullWidth
                        name="weight"
                        type="Number"
                        autoComplete="Weight"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl>
                        <InputLabel id="bloodgrp-label" required>
                          Blood Group
                        </InputLabel>
                        <Select
                          variant="standard"
                          labelID="bloodgrp-label"
                          id="bloodgroup"
                          required
                          name="bloodgroup"
                          sx={{
                            width: 150,
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
                          <MenuItem value={"Others"}>Others</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox id="diabetic" name="diabetic" />}
                          label="Diabetic"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              id="highBloodPressure"
                              name="highBloodPressure"
                            />
                          }
                          label="High BP"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox id="Heart-Issues" name="heartDisease" />
                          }
                          label="Heart Issues"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox id="kidneyDisease" name="kidneyDisease" />
                          }
                          label="Kidney Issues"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              id="lactoseIntolerance"
                              name="lactoseIntolerance"
                            />
                          }
                          label="Lactose Intolerance"
                          style={{ fontSize: "1em" }}
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox id="isVeg" name="isVeg" />}
                          label="Vegetarian"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ marginTop: "-10px" }}>
                      <TextField
                        id="allergy"
                        name="allergy"
                        label="Allergy"
                        helperText="If yes, please specify (comma separated)"
                        fullWidth
                        autoComplete=""
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ marginTop: "-10px" }}>
                      <FormControl>
                        <InputLabel id="activitylvl-label" required>
                          Activity Level
                        </InputLabel>
                        <Select
                          labelID="activitylvl-label"
                          variant="standard"
                          id="activitylevel"
                          required
                          name="activitylevel"
                          sx={{
                            width: 150,
                          }}
                        >
                          <MenuItem value={"Little or no exercise"}>Little or no exercise</MenuItem>
                          <MenuItem value={"Light exercise or sports 1-3 days a week"}>Light exercise or sports 1-3 days a week</MenuItem>
                          <MenuItem value={"Moderate exercise or sports 3-5 days a week"}>
                            Moderate exercise or sports 3-5 days a week
                          </MenuItem>
                          <MenuItem value={"Hard exercise or sports 6-7 days a week"}>
                            Hard exercise or sports 6-7 days a week
                          </MenuItem>
                          <MenuItem value={"Very hard exercise or sports, training twice a day"}>
                            Very hard exercise or sports, training twice a day
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <Link href="/signin" variant="body2">
                        {"Already have an account? Sign In"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    onClick={handleSubmit}
                    // href="/dashboard"
                  >
                    Sign Up
                  </Button>
                </React.Fragment>
              </Paper>
            </Container>
          </Grid>
          <Grid item xs={12} md={6}>
            <Container sx={{ py: 12 }}>
              <img
                class="cropped-image2"
                width="100%"
                heigth="100%"
                position="fixed"
                src="https://cdn.dribbble.com/userupload/3930303/file/original-78dfe73f7b695c630804e725b9d001a1.png?compress=1&resize=1504x1128"
                alt="Recipe Image"
              />
            </Container>
            <Container>
              <Typography type="error" align="center" color={"red"}>
                {error_message != "" && error_message}
              </Typography>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
  // if already logged in
  if (JSON.parse(localStorage.getItem("user") !== null)) {
    window.location.href = "/dashboard";
  } else {
    return signuppage;
  }
}
