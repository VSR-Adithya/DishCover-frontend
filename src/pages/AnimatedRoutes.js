import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Profile from './profile';
import Dashboard from './dashboard';
import Signup from './signup';
import Signin from './signin';
import Saved from './saved';
import Maindash from "./maindash";
import Recipe from './recipe';
import Healthdash from "./healthdash";

import { AnimatePresence } from "framer-motion";
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
      <Route path="/" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="saved" element={<Saved />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Home" element={<Maindash />} />
          <Route path="Health" element={<Healthdash />} />
          <Route path="profile" element={<Profile />} />
          <Route path="recipe" element={<Recipe />} />
        </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;