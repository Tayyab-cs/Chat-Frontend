import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Auth from "./components/Auth/Auth";
import "./index.css";
import theme from "./theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <ThemeEditorProvider />
    <BrowserRouter>
      <Auth>
        <App />
      </Auth>
    </BrowserRouter>
    <ThemeEditorProvider />
  </ChakraProvider>,
);
