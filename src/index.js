import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/system";
import { StyledEngineProvider } from "@mui/material/styles";
import "./styles/index.css";
import App from "./App";
import theme from "./styles/theme";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
