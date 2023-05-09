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
import { domain } from "../App";
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
      <Route path="/" element={<Signin />} />
          <Route path={`${domain}/signup`} element={<Signup />} />
          <Route path={`${domain}/signin`} element={<Signin />} />
          <Route path={`${domain}/saved`} element={<Saved />} />
          <Route path={`${domain}/dashboard`} element={<Dashboard />} />
          <Route path={`${domain}/Home`} element={<Maindash />} />
          <Route path={`${domain}/Health`} element={<Healthdash />} />
          <Route path={`${domain}/profile`} element={<Profile />} />
          <Route path={`${domain}/recipe`} element={<Recipe />} />
        </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;