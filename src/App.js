import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AnimatedRoutes from "./pages/AnimatedRoutes.js";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/poppins"

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="back">
        <div className="App">
          <Router>
           <AnimatedRoutes />
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
}
